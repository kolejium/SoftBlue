using SoftBlue.Library.Dto.Bookcase;
using SoftBlue.Library.Dto.Shared;

namespace SoftBlue.Library.Dto.Wall;

public class WallDto : DataDto
{
    public IEnumerable<BookcaseDto>? Bookcases { get; set; }

    public int Order { get; set; }
}