using System.ComponentModel.DataAnnotations.Schema;

namespace SoftBlue.Library.Database.Models;

public class BookEntity : DataEntity
{
    #region [ Properties ]

    public string? Author { get; set; }

    public BookcaseEntity? Bookcase { get; set; }

    [ForeignKey(nameof(Bookcase))] public Guid BookcaseId { get; set; }
    public string? Name { get; set; }

    public int ShelfNumber { get; set; }

    public bool IsUploaded { get; set; }

    public long Size { get; set; }

    #endregion
}