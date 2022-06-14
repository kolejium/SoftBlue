using System.Linq.Expressions;
using SoftBlue.Common.Helpers;

namespace SoftBlue.Common.Interfaces;

public interface IRepository<T>
{
    Task<T> Add(T value, bool save = true);

    Task<IEnumerable<T>> AddRange(IEnumerable<T> values);

    Task<T?> Get(Guid id);

    Task<T?> Get(Expression<Func<T, bool>> filter);

    Task<(long total, IEnumerable<T> items)> GetRange(int page, int size, Expression<Func<T, bool>>? filter = null, SortDefinition? sort = null);

    Task<IEnumerable<T>> Get();

    Task<T> Update(T value);

    Task Remove(T value);

    Task RemoveRange(IEnumerable<T> values);
}

public interface INewRepository<T>
{

}