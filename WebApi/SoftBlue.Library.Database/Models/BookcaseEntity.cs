namespace SoftBlue.Library.Database.Models;

public class BookcaseEntity : DataEntity
{
    public int Order { get; set; }

    public IEnumerable<BookEntity>? Books { get; set; }
}