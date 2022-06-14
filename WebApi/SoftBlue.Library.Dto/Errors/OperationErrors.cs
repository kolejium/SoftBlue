using SoftBlue.Common.Operation;

namespace SoftBlue.Library.Dto.Errors;

public class OperationErrors
{
    /// <summary>
    ///     Predefined errors
    /// </summary>
    public enum Errors
    {
        BookNotFound = 01404,
        BookIsNotUpload =01405,
        BookcaseNotFound = 02404,

        BookcaseTransactionError = 01500
    }

    public static OperationError? BookNotFound(string? message)
    {
        var errorCode = Enum.GetName(typeof(Errors), Errors.BookNotFound);
        if (string.IsNullOrEmpty(message))
        {
            message = errorCode!;
        }

        return new OperationError((int)Errors.BookNotFound, errorCode!, message);
    }

    public static OperationError? BookIsNotUpload(string? message)
    {
        var errorCode = Enum.GetName(typeof(Errors), Errors.BookIsNotUpload);
        if (string.IsNullOrEmpty(message))
        {
            message = errorCode!;
        }

        return new OperationError((int)Errors.BookIsNotUpload, errorCode!, message);
    }

    public static OperationError? BookcaseNotFound(string? message)
    {
        var errorCode = Enum.GetName(typeof(Errors), Errors.BookcaseNotFound);
        if (string.IsNullOrEmpty(message))
        {
            message = errorCode!;
        }

        return new OperationError((int)Errors.BookcaseNotFound, errorCode!, message);
    }

    public static OperationError? BookcaseTransactionError(string? message)
    {
        var errorCode = Enum.GetName(typeof(Errors), Errors.BookcaseTransactionError);
        if (string.IsNullOrEmpty(message))
        {
            message = errorCode!;
        }

        return new OperationError((int)Errors.BookcaseTransactionError, errorCode!, message);
    }
}