using SoftBlue.Library.Dto.Shared;

namespace SoftBlue.Library.Dto.Book;

public class BookDto : DataDto
{
    #region [ Properties ]

    public string? Author { get; set; }

    public Guid BookcaseId { get; set; }
    public string? Name { get; set; }

    public int ShelfNumber { get; set; }

    #endregion
}