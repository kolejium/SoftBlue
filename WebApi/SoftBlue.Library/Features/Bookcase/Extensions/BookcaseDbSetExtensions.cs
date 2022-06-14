using Microsoft.EntityFrameworkCore;
using SoftBlue.Library.Database.Models;

namespace SoftBlue.Library.Features.Bookcase.Extensions;

public static class BookcaseDbSetExtensions
{
    public static async Task<int> MaxOrderAsync(this DbSet<BookcaseEntity> dbSet) => await dbSet.CountAsync() == 0
        ? -1
        : await dbSet.AsNoTracking().MaxAsync(entity => entity.Order);

    public static async Task ShiftRight(this DbSet<BookcaseEntity> dbSet, int order, int shift)
    {

    }
}