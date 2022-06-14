using System.Data;
using System.Diagnostics;
using System.Linq.Expressions;
using AutoMapper;
using Flurl.Http;
using Flurl.Http.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SoftBlue.Common.Helpers;
using SoftBlue.Common.Operation;
using SoftBlue.Common.Responses;
using SoftBlue.Library.Database;
using SoftBlue.Library.Database.Contexts;
using SoftBlue.Library.Database.Models;
using SoftBlue.Library.Dto.Book;
using SoftBlue.Library.Dto.Book.Requests;
using SoftBlue.Library.Dto.Errors;
using SoftBlue.Library.Features.Book.Interfaces;
using SoftBlue.Library.Features.Bookcase.Extensions;
using SoftBlue.Library.Features.Extensions;
using SoftBlue.Library.Infrastructure;
using SoftBlue.Storage.Dto.Requests;
using SoftBlue.Storage.Dto.Responses;

namespace SoftBlue.Library.Features.Book.Services;

public class BookService : IBookService
{
    #region [ Variabales ]

    private readonly Context _context;
    private readonly IMapper _mapper;
    private readonly IFlurlClient _flurlClient;
    private readonly StorageSettings _storageSettings;

    #endregion

    #region [ Constructors ]

    public BookService(Context context, IFlurlClientFactory flurlClientFactory, IOptions<StorageSettings> storageSettings, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
        _flurlClient = flurlClientFactory.Get(storageSettings.Value.StorageApiBaseUrl);
        _storageSettings = storageSettings.Value;
    }

    #endregion

    public async Task<OperationResult<string>> GetPdf(Guid id)
    {
        var result = await _context.Books.FindAsync(id);

        if (result == null)
            return new OperationResult<string>(OperationErrors.BookNotFound($"Book with Id:{id} not found"));

        if (!result.IsUploaded)
            return new OperationResult<string>(OperationErrors.BookIsNotUpload($"Book with Id:{id} is not upload"));

        var byteArray = await _flurlClient.Request(string.Format(_storageSettings.GetFile, id)).GetJsonAsync<byte[]>();

        return new OperationResult<string>(Convert.ToBase64String(byteArray));
    }

    public async Task<OperationResult<BookDto>> Create(CreateBookRequest request)
    {
        if (request.BookcaseId.HasValue == false)
            request.BookcaseId = (await _context.Bookcases.AddAsync(new BookcaseEntity
                { Order = (await _context.Bookcases.MaxOrderAsync()) + 1 })).Entity.Id;

        var result = await _context.Books.AddAsync(_mapper.Map<CreateBookRequest, BookEntity>(request));

        await _context.SaveChangesAsync();



        return new OperationResult<BookDto>(_mapper.Map<BookEntity, BookDto>(result.Entity));
    }

    public async Task<OperationResult<BookDto>> Create(WithFileRequestT<CreateBookRequest> request)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted);
        try
        {
            if (request.Value.BookcaseId.HasValue == false)
                request.Value.BookcaseId = (await _context.Bookcases.AddAsync(new BookcaseEntity
                    { Order = (await _context.Bookcases.MaxOrderAsync()) + 1 })).Entity.Id;

            var result = await _context.Books.AddAsync(_mapper.Map<CreateBookRequest, BookEntity>(request.Value));

            await _context.SaveChangesAsync();

            if (request.Source != null)
            {
                await Upload(new UploadRequest() { Id = result.Entity.Id, Source = request.Source });

                result.Entity.IsUploaded = true;

                await _context.SaveChangesAsync();
            }

            await transaction.CommitAsync();

            return new OperationResult<BookDto>(_mapper.Map<BookEntity, BookDto>(result.Entity));
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();

            return new OperationResult<BookDto>(OperationErrors.BookcaseTransactionError(e.Message));
        }
    }

    public async Task<OperationResult<BookDto>> Delete(Guid id)
    {
        if (await _context.Books.FindAsync(id) is var value && value == null)
            return new OperationResult<BookDto>(OperationErrors.BookNotFound($"Book with Id: {id} not found"));

        if (value.IsUploaded)
        {
            var result = await _flurlClient.Request(string.Format(_storageSettings.DeleteFile, value.Id)).DeleteAsync();

            if (result.StatusCode != 200)
                return new OperationResult<BookDto>(OperationErrors.BookNotFound(result.StatusCode.ToString()));
        }

        _context.Books.Remove(value);
        await _context.SaveChangesAsync();

        return new OperationResult<BookDto>(_mapper.Map<BookEntity, BookDto>(value));
    }

    public async Task<OperationResult<BookDto>> Get(Guid id)
    {
        var result = await _context.Books.FindAsync(id);

        return result == null
            ? new OperationResult<BookDto>(OperationErrors.BookNotFound($"Book with Id:{id} not found"))
            : new OperationResult<BookDto>(_mapper.Map<BookEntity, BookDto>(result));
    }

    public async Task<OperationResult<PagedResponse<BookDto>>> Get(GetBooksRequest request)
    {
        Expression<Func<BookEntity, bool>> expression = entity => true;
        SortDefinition? sort = null;

        if (!string.IsNullOrEmpty(request.Name))
            expression = expression.AndAlso(entity => entity.Name == request.Name);

        if (!string.IsNullOrEmpty(request.Author))
            expression = expression.AndAlso(entity => entity.Name == request.Author);

        if (!string.IsNullOrEmpty(request.Q))
            expression = expression.AndAlso(entity => EF.Functions.Like(entity.Name, $"%{request.Q}%") || EF.Functions.Like(entity.Author, $"%{request.Q}%"));

        if (!string.IsNullOrEmpty(request.OrderField))
            sort = new SortDefinition { Property = request.OrderField, Order = request.Order };


        var (total, items) = await _context.Books.GetRange(request.Page, request.Size,
            expression, sort);

        return new OperationResult<PagedResponse<BookDto>>(new PagedResponse<BookDto>
            { Items = _mapper.Map<IEnumerable<BookEntity>, IEnumerable<BookDto>>(items), Total = total });
    }

    public async Task<OperationResult<BookDto>> Update(UpdateBookRequest request)
    {
        if (await _context.Books.FindAsync(request.Id) is var value && value == null)
            return new OperationResult<BookDto>(OperationErrors.BookNotFound($"Book with Id: {request.Id} not found"));

        var entity = _mapper.Map<UpdateBookRequest, BookEntity>(request, value);

        _context.Books.Update(entity);
        await _context.SaveChangesAsync();

        return new OperationResult<BookDto>(_mapper.Map<BookEntity, BookDto>(value));
    }

    public async Task<OperationResult<BookDto>> Update(WithFileRequestT<UpdateBookRequest> request)
    {
        if (await _context.Books.FindAsync(request.Value.Id) is var value && value == null)
            return new OperationResult<BookDto>(OperationErrors.BookNotFound($"Book with Id: {request.Value.Id} not found"));

        var entity = _mapper.Map<UpdateBookRequest, BookEntity>(request.Value, value);

        if (request.Source != null)
        {
            await Upload(new UploadRequest() { Id = value.Id, Source = request.Source });

            entity.IsUploaded = true;
        }

        _context.Books.Update(entity);
        await _context.SaveChangesAsync();

        return new OperationResult<BookDto>(_mapper.Map<BookEntity, BookDto>(value));
    }

    public async Task<OperationResult<UploadResponse>> Upload(UploadRequest request)
    {
        try
        {
            await _flurlClient.Request(_storageSettings.UploadFile).PostMultipartAsync(mp => mp
                .AddFile(nameof(request.Source), request.Source.OpenReadStream(), "foo.txt")
                .AddString(nameof(request.Id), request.Id.ToString()));
        }
        catch (FlurlHttpException ex)
        {
            var resp = await ex.GetResponseStringAsync();
            Debug.WriteLine(resp);
        }

        return new OperationResult<UploadResponse>(new UploadResponse());
    }
}