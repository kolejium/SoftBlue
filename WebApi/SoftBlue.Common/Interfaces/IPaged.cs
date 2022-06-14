namespace SoftBlue.Common.Interfaces;

/// <summary>
///     Paged data container
/// </summary>
/// <typeparam name="T">Contained data type</typeparam>
public interface IPaged<T>
{
    #region [ Properties ]

    /// <summary>
    ///     Page with items
    /// </summary>
    T[] Items { get; set; }

    /// <summary>
    ///     Total number of items in filtered collection
    /// </summary>
    long Total { get; set; }

    #endregion
}