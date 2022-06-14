namespace SoftBlue.Library.Dto.Book.Requests;

public class UpdateBookRequest
{
    #region [ Properties ]

    public Guid Id { get; set; }

    public string? Author { get; set; }

    public Guid BookcaseId { get; set; }
    public string? Name { get; set; }

    public int ShelfNumber { get; set; }

    #endregion
}