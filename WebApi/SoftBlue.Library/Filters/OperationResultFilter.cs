using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SoftBlue.Common.Operation;
using SoftBlue.Library.Dto.Errors;
using SoftBlue.Library.Features;

namespace SoftBlue.Library.Filters;

public class OperationResultFilter : IAsyncResultFilter
{
    public async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
    {
        switch (context.Result)
        {
            //Validation failed
            case BadRequestObjectResult _:
                break;
            //Business logic failed
            case ObjectResult oor when oor.DeclaredType == typeof(OperationResult<>):
                var result = oor.Value as IOperationResult;

                //Unknown result type, leave as is
                if (result is null)
                {
                    break;
                }

                if (result.IsError)
                {
                    context.Result = result.Error?.EventId switch
                    {
                        (int)OperationErrors.Errors.BookNotFound => new NotFoundObjectResult(result),
                        //(int)OperationErrors.Errors.AccessDenied => new ForbidResult(),
                        //(int)OperationErrors.Errors.ReviewNotFound => new NotFoundObjectResult(result),
                        _ => context.Result
                    };
                }
                else
                {
                    context.Result = new ObjectResult(result.Data)
                    {
                        StatusCode = oor.StatusCode
                    };
                }
                break;
        }

        await next();
    }
}