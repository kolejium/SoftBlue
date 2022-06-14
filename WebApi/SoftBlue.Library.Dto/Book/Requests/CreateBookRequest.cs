using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace SoftBlue.Library.Dto.Book.Requests;

public class CreateBookRequest
{
    #region [ Properties ]

    public string? Author { get; set; }

    public Guid? BookcaseId { get; set; }

    [Required]
    [MinLength(1, ErrorMessage = "Name can't be empty")]
    public string Name { get; set; }

    [Range(0, int.MaxValue)] public int ShelfNumber { get; set; }

    #endregion
}