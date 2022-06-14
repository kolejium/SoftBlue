using SoftBlue.Library.Dto.Book;
using SoftBlue.Library.Dto.Shared;

namespace SoftBlue.Library.Dto.Bookcase;

public class BookcaseDto : DataDto
{
    public int Order { get; set; }

    public IEnumerable<BookDto>? Books { get; set; }
}