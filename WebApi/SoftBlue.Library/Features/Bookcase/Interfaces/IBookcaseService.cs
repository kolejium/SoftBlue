using SoftBlue.Common.Operation;
using SoftBlue.Common.Responses;
using SoftBlue.Library.Dto.Bookcase;
using SoftBlue.Library.Dto.Bookcase.Requests;

namespace SoftBlue.Library.Features.Bookcase.Interfaces;

public interface IBookcaseService
{
    Task<OperationResult<BookcaseDto>> ChangeOrder(Guid id, int order);
    Task<OperationResult<BookcaseDto>> Create(CreateBookcaseRequest request);

    Task<OperationResult<BookcaseDto>> Delete(Guid id);

    Task<OperationResult<BookcaseDto>> Get(Guid id);

    Task<OperationResult<PagedResponse<BookcaseDto>>> Get(GetBookcasesRequest request);
}