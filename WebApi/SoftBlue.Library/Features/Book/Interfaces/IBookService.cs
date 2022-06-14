using SoftBlue.Common.Operation;
using SoftBlue.Common.Responses;
using SoftBlue.Library.Dto.Book;
using SoftBlue.Library.Dto.Book.Requests;
using SoftBlue.Storage.Dto.Requests;
using SoftBlue.Storage.Dto.Responses;

namespace SoftBlue.Library.Features.Book.Interfaces;

public interface IBookService
{
    Task<OperationResult<BookDto>> Create(CreateBookRequest request);

    Task<OperationResult<BookDto>> Create(WithFileRequestT<CreateBookRequest> request);

    Task<OperationResult<BookDto>> Delete(Guid id);
    Task<OperationResult<PagedResponse<BookDto>>> Get(GetBooksRequest request);

    Task<OperationResult<BookDto>> Get(Guid id);

    Task<OperationResult<string>> GetPdf(Guid id);

    Task<OperationResult<BookDto>> Update(UpdateBookRequest request);

    Task<OperationResult<BookDto>> Update(WithFileRequestT<UpdateBookRequest> request);

    Task<OperationResult<UploadResponse>> Upload(UploadRequest request);
}