namespace SoftBlue.Common.Operation;

/// <summary>
///     Represents business operation result is operation succeed and error if operation doesn't
/// </summary>
/// <typeparam name="T">Type of result</typeparam>
public class OperationResult<T> : IOperationResult<T> where T : class
{
    /// <summary>
    ///     Default ctor
    /// </summary>
    /// <param name="data">Data</param>
    /// <param name="error">Error</param>
    private OperationResult(T? data, OperationError? error)
    {
        Data = data;
        Error = error;

        IsError = error is not null;
    }

    /// <summary>
    ///     Create result for succeeded operation
    /// </summary>
    /// <param name="data">Result</param>
    /// <returns>Data wrapped in succeed operation result</returns>
    public OperationResult(T? data) : this(data, default) { }

    /// <summary>
    ///     Create result for erroneous operation
    /// </summary>
    /// <param name="error">Error</param>
    /// <returns>Data wrapped in erroneous operation result</returns>
    public OperationResult(OperationError? error) : this(default, error) { }

    /// <summary>
    ///     Result
    /// </summary>
    public T? Data { get; }

    /// <summary>
    ///     Result
    /// </summary>
    public OperationError? Error { get; }

    /// <summary>
    ///     Returns true if result erroneous
    /// </summary>
    public bool IsError { get; }

    object? IOperationResult.Data => Data;
}