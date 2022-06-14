using System.ComponentModel.DataAnnotations;

namespace SoftBlue.Library.Database.Models;

/// <summary>
///     Base class for creating entities
/// </summary>
public abstract class Base
{
    /// <summary>
    ///     Unique identifier
    /// </summary>
    [Key]
    public Guid Id { get; set; }
}