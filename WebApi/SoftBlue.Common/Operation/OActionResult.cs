using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace SoftBlue.Common.Operation;

/// <summary>
///     A type that wraps either an <typeparamref name="T" /> instance or an <see cref="ActionResult" />.
/// </summary>
/// <typeparam name="T">The type of the result.</typeparam>
public class OActionResult<T> : IConvertToActionResult where T : class, IOperationResult
{
    /// <summary>
    ///     Initializes a new instance of <see cref="OActionResult{T}" /> using the specified <paramref name="value" />.
    /// </summary>
    /// <param name="value">The value.</param>
    public OActionResult(T value)
    {
        if (typeof(IActionResult).IsAssignableFrom(typeof(T)))
        {
            var error = $"Invalid type parameter '{typeof(T)}' specified for 'OActionResult<T>'";
            throw new ArgumentException(error);
        }

        Value = value;
    }

    /// <summary>
    ///     Initializes a new instance of <see cref="OActionResult{T}" /> using the specified <see cref="ActionResult" />.
    /// </summary>
    /// <param name="result">The <see cref="ActionResult" />.</param>
    public OActionResult(ActionResult result)
    {
        if (typeof(IActionResult).IsAssignableFrom(typeof(T)))
        {
            var error = $"Invalid type parameter '{typeof(T)}' specified for 'OActionResult<T>'";
            throw new ArgumentException(error);
        }

        Result = result ?? throw new ArgumentNullException(nameof(result));
    }

    /// <summary>
    ///     Gets the <see cref="ActionResult" />.
    /// </summary>
    public ActionResult Result { get; }

    /// <summary>
    ///     Gets the value.
    /// </summary>
    public T Value { get; }

    IActionResult IConvertToActionResult.Convert()
    {
        return Result ?? new ObjectResult(Value)
        {
            DeclaredType = typeof(T)
        };
    }

    /// <summary>
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    public static implicit operator OActionResult<T>(T value)
    {
        if (value == null)
        {
            throw new ArgumentNullException(nameof(value));
        }

        if (value.IsError)
        {
            return new ObjectResult(
                new ProblemDetails
                {
                    Detail = value.Error?.Message,
                    Status = (int?)HttpStatusCode.InternalServerError,
                    Title = "Error",
                    Extensions = { { "code", value.Error?.Code } }
                })
            {
                StatusCode = (int?)HttpStatusCode.InternalServerError, 
                DeclaredType = typeof(OperationResult<>)
            };
        }

        return new OkObjectResult(value.Data);
    }

    /// <summary>
    /// </summary>
    /// <param name="result"></param>
    /// <returns></returns>
    public static implicit operator OActionResult<T>(ActionResult result)
    {
        return new(result);
    }
}