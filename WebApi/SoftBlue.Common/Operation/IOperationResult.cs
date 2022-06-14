using SoftBlue.Common.Operation;

namespace SoftBlue.Common.Operation;

/// <summary>
///     Marker interface for Operation result
/// </summary>
public interface IOperationResult
{
    /// <summary>
    ///     Result
    /// </summary>
    OperationError? Error { get; }

    /// <summary>
    ///     Returns true if result erroneous
    /// </summary>
    bool IsError { get; }

    /// <summary>
    ///     Non-generic result accessor
    /// </summary>
    object? Data { get; }
}

/// <summary>
///     Generic operation result
/// </summary>
/// <typeparam name="T">Operation result type</typeparam>
public interface IOperationResult<out T> : IOperationResult where T : class
{
    /// <summary>
    ///     Result
    /// </summary>
    new T? Data { get; }
}