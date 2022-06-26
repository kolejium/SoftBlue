using SoftBlue.Common.Enums;
using SoftBlue.Common.Interfaces;

namespace SoftBlue.Common.Requests;

/// <summary>
///     Basic implementation of <see cref="IPagedRequest"/>
/// </summary>
public class PagedRequest : IPagedRequest
{
    #region [ Properties ]

    /// <inheritdoc cref="IPagedRequest.Page"/>
    /// <remarks>Default value is 1</remarks>
    public int Page { get; set; } = 1;

    /// <inheritdoc cref="IPagedRequest.Size"/>
    /// <remarks>Default value is 10</remarks>
    public int Size { get; set; } = 10;

    /// <inheritdoc cref="IPagedRequest.Direction"/>
    /// <remarks>Default value is Begin</remarks>
    public EDirection Direction { get; set; } = EDirection.Begin;

    #endregion
}