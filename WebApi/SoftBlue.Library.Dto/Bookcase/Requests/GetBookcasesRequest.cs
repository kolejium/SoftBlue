using SoftBlue.Common.Enums;
using SoftBlue.Common.Requests;

namespace SoftBlue.Library.Dto.Bookcase.Requests;

public class GetBookcasesRequest : PagedRequest
{
    public EOrder Order { get; set; }

}