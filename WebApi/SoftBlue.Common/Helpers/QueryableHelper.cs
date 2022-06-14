using System.Linq.Expressions;
using SoftBlue.Common.Enums;

namespace SoftBlue.Common.Helpers;

public static class QueryableHelper
{
    public static IOrderedQueryable<T> Sort<T>(this IQueryable<T> collection, string property, EOrder order, string defaultProperty = null)
    {
        property = PropertyHelper.FormatPropertyName(property);

        if (!PropertyHelper.ValidProperty<T>(property))
            property = defaultProperty;

        var parameter = Expression.Parameter(typeof(T));
        var lambda = Expression.Lambda<Func<T, object>>(Expression.Convert(Expression.Property(parameter, property), typeof(object)), parameter);

        return order == EOrder.Asc
            ? collection.OrderBy(lambda)
            : collection.OrderByDescending(lambda);
    }

    public static IOrderedQueryable<T> Sort<T>(this IQueryable<T> collection, SortDefinition sortDefinition) =>
        collection.Sort(sortDefinition.Property, sortDefinition.Order, sortDefinition.DefaultProperty);
}