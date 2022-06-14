namespace SoftBlue.Common.Interfaces;

public interface IPagedResponse<T>
{
    public IEnumerable<T>? Items { get; set; }

    public long Total { get; set; }
}