namespace SoftBlue.Common.Helpers;

public static class PropertyHelper
{
    public static bool ValidProperty<T>(string property, bool checkFormat = false)
    {
        if (checkFormat)
            property = FormatPropertyName(property);

        return typeof(T).GetProperty(property) is var propertyInfo && propertyInfo != null;
    }

    public static string FormatPropertyName(string property)
    {
        if (char.IsLower(property[0]))
            property = char.ToUpper(property[0]) + property[1..];

        return property;
    }
}