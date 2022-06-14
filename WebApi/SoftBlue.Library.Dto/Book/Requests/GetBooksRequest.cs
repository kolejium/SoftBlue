using SoftBlue.Common.Enums;
using SoftBlue.Common.Requests;

namespace SoftBlue.Library.Dto.Book.Requests;

public class GetBooksRequest : PagedRequest
{
    #region [ Properties ]

    /// <summary>
    ///     Order for Order Field <see cref="OrderField"/>
    /// </summary>
    public EOrder Order { get; set; }

    /// <summary>
    ///     Query
    /// </summary>
    public string? Q { get; set; }

    /// <summary>
    ///     Order field
    /// <para>
    ///     Field can be in lower case like "cratedAt" or in upper case "CratedAt"
    /// </para>
    /// <remarks>
    ///     <para>If sort field will not be found in instance of model, sort will be default</para>
    ///     <para>Example: "create***At" is invalid will be used default</para>
    /// </remarks>
    /// </summary>
    public string? OrderField { get; set; }

    public string? Author { get; set; }

    public string? Name { get; set; }

    /// <summary>
    ///     Include dependencies
    /// <remarks>
    ///     <para>Dependencies like bookcases</para>
    /// </remarks>
    /// </summary>
    public bool IncludeDependencies { get; set; }

    #endregion
}