using System.ComponentModel.DataAnnotations;

namespace SoftBlue.Common.Interfaces;

/// <summary>
///     Defines properties for paged request
/// </summary>
public interface IPagedRequest
{
    /// <summary>
    ///     Page number
    /// </summary>
    /// <example>1</example>
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Can't be less or equal that zero")]
    public int Page { get; set; }

    /// <summary>
    ///     Number of items per page
    /// </summary>
    /// <example>10</example>
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Can't be less or equal that zero")]
    public int Size { get; set; }
}