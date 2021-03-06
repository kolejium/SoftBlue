using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using SoftBlue.Common.Enums;
using SoftBlue.Common.Helpers;
using SoftBlue.Library.Database.Models;

namespace SoftBlue.Library.Features.Extensions;

/// <summary>
///     DbSet Extensions
/// </summary>
public static class DbSetExtensions
{
    /// <summary>
    ///     Get range
    /// </summary>
    /// <typeparam name="T">type of entity</typeparam>
    /// <param name="query">query</param>
    /// <param name="page">page</param>
    /// <param name="size">size</param>
    /// <param name="filter">filter</param>
    /// <param name="sort">sort</param>
    /// <returns>Tuple of total count by filter and enumerable of items</returns>
    public static async Task<(long total, IEnumerable<T> items)> GetRange<T>(this IQueryable<T> query, int page, int size, Expression<Func<T, bool>>? filter = null, SortDefinition? sort = null) where T : DataEntity
    {
        filter ??= entity => true;
        sort ??= new SortDefinition() { Property = nameof(DataEntity.CreatedAt), Order = EOrder.Asc };

        return (
            await query.AsNoTracking().CountAsync(filter),
            (await query.AsNoTracking().Where(filter).Sort(sort).Skip((page - 1) * size).Take(size).ToListAsync())!
        );
    }
}