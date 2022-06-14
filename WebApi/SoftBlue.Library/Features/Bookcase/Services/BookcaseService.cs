using System.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SoftBlue.Common.Enums;
using SoftBlue.Common.Helpers;
using SoftBlue.Common.Operation;
using SoftBlue.Common.Responses;
using SoftBlue.Library.Database.Contexts;
using SoftBlue.Library.Database.Models;
using SoftBlue.Library.Dto.Bookcase;
using SoftBlue.Library.Dto.Bookcase.Requests;
using SoftBlue.Library.Dto.Errors;
using SoftBlue.Library.Features.Bookcase.Interfaces;
using SoftBlue.Library.Features.Extensions;

namespace SoftBlue.Library.Features.Bookcase.Services;

public class BookcaseService : IBookcaseService
{
    #region [ Variabales ]

    private readonly Context _context;
    private readonly IMapper _mapper;

    #endregion

    #region [ Constructors ]

    public BookcaseService(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    #endregion

    public async Task<OperationResult<BookcaseDto>> ChangeOrder(Guid id, int order)
    {
        if (await _context.FindAsync<BookcaseEntity>(id) is var bookcase && bookcase == null)
            return new OperationResult<BookcaseDto>(OperationErrors.BookcaseNotFound($"Bookcase with {id} not found"));

        if (bookcase.Order == order)
            return new OperationResult<BookcaseDto>(_mapper.Map<BookcaseEntity, BookcaseDto>(bookcase));

        var temp = bookcase.Order;

        await using (var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable))
        {
            try
            {
                await _context.Database.ExecuteSqlInterpolatedAsync($"Call public.\"ShiftRightOrder\"({order}, 1)");
                await _context.SaveChangesAsync();

                bookcase.Order = order;
                await _context.SaveChangesAsync();

                await _context.Database.ExecuteSqlInterpolatedAsync($"Call public.\"ShiftLeftOrder\"({temp + 1}, 1)");
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();

                return new OperationResult<BookcaseDto>(OperationErrors.BookcaseTransactionError(e.Message));
            }
        }

        return new OperationResult<BookcaseDto>(_mapper.Map<BookcaseEntity, BookcaseDto>(bookcase));
    }

    public async Task<OperationResult<BookcaseDto>> Create(CreateBookcaseRequest request)
    {
        var result = await _context.Bookcases.AddAsync(_mapper.Map<CreateBookcaseRequest, BookcaseEntity>(request));

        await _context.SaveChangesAsync();

        return new OperationResult<BookcaseDto>(_mapper.Map<BookcaseEntity, BookcaseDto>(result.Entity));
    }

    public async Task<OperationResult<BookcaseDto>> Get(Guid id)
    {
        if (await _context.Bookcases.Include(x => x.Books).FirstOrDefaultAsync(x => x.Id == id) is var bookcase && bookcase == null)
            return new OperationResult<BookcaseDto>(OperationErrors.BookcaseNotFound($"Bookcase with {id} not found"));

        return new OperationResult<BookcaseDto>(_mapper.Map<BookcaseEntity, BookcaseDto>(bookcase));
    }

    public async Task<OperationResult<BookcaseDto>> Delete(Guid id)
    {
        if (await _context.FindAsync<BookcaseEntity>(id) is var bookcase && bookcase == null)
            return new OperationResult<BookcaseDto>(OperationErrors.BookcaseNotFound($"Bookcase with {id} not found"));

        _context.Bookcases.Remove(bookcase);

        await _context.SaveChangesAsync();

        return new OperationResult<BookcaseDto>(_mapper.Map<BookcaseEntity, BookcaseDto>(bookcase));
    }

    public async Task<OperationResult<PagedResponse<BookcaseDto>>> Get(GetBookcasesRequest request)
    {
        var sort = new SortDefinition { Order = EOrder.Asc, Property = nameof(BookcaseEntity.Order) };
        var (total, items) = await _context.Bookcases.Include(x => x.Books).GetRange(request.Page, request.Size,
            null, sort);

        return new OperationResult<PagedResponse<BookcaseDto>>(new PagedResponse<BookcaseDto>
            { Items = _mapper.Map<IEnumerable<BookcaseEntity>, IEnumerable<BookcaseDto>>(items), Total = total });
    }
}