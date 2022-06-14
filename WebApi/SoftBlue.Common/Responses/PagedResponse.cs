using SoftBlue.Common.Interfaces;

namespace SoftBlue.Common.Responses;

public class PagedResponse<T> : IPagedResponse<T>
{
    public IEnumerable<T>? Items { get; set; }
    public long Total { get; set; }
}