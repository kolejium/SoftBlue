namespace SoftBlue.Common.Operation;

/// <summary>
///     Error with machine-readable code and human-readable description
/// </summary>
public class OperationError
{
    /// <summary>
    ///     String event code
    /// </summary>
    /// <remarks>For clients</remarks>
    /// <example>NETWORK_ERROR</example>
    public readonly string Code;

    /// <summary>
    ///     Numeric event code
    /// </summary>
    /// <remarks>For logging purposes mostly</remarks>
    /// <example>10</example>
    public readonly int EventId;

    /// <summary>
    ///     Human readable
    /// </summary>
    /// <remarks>Human readable error description</remarks>
    /// <example>Service unavailable, please try again later</example>
    public readonly string Message;

    /// <summary>
    ///     Create instance of Operation Error
    /// </summary>
    /// <param name="eventId">numeric event code</param>
    /// <param name="code">code</param>
    /// <param name="message">message</param>
    public OperationError(int eventId, string code, string message)
    {
        EventId = eventId;
        Code = code;
        Message = message;
    }
}