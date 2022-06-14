using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace SoftBlue.Library.Filters;

public class EnumDocumentFilter : IDocumentFilter
{
    public void Apply(OpenApiDocument doc, DocumentFilterContext context)
    {
        // add enum descriptions to result models
        foreach (var (key, value) in doc.Components.Schemas.Where(x => x.Value?.Enum?.Count > 0))
        {
            var propertyEnums = value.Enum;
            if (propertyEnums is { Count: > 0 })
            {
                value.Description += DescribeEnum(propertyEnums, key);
            }
        }

        // add enum descriptions to input parameters
        foreach (var (key, value) in doc.Paths)
        {
            DescribeEnumParameters(value.Operations, doc, context.ApiDescriptions, key);
        }
    }

    private static void DescribeEnumParameters(IDictionary<OperationType, OpenApiOperation>? operations, OpenApiDocument doc, IEnumerable<ApiDescription> apiDescriptions, string path)
    {
        path = path.Trim('/');
        if (operations == null)
        {
            return;
        }

        var pathDescriptions = apiDescriptions.Where(a => a.RelativePath == path).ToArray();
        foreach (var (operationType, openApiOperation) in operations)
        {
            var operationDescription = pathDescriptions.FirstOrDefault(a => a.HttpMethod.Equals(operationType.ToString(), StringComparison.InvariantCultureIgnoreCase));
            if (operationDescription == null)
            {
                continue;
            }

            foreach (var param in openApiOperation.Parameters)
            {
                var parameterDescription = operationDescription.ParameterDescriptions.FirstOrDefault(a => a.Name == param.Name);
                if (parameterDescription is { Type: null })
                {
                    Console.WriteLine("Affect");
                }

                if (parameterDescription == null
                    || !TryGetEnumType(parameterDescription.Type, out var enumType))
                {
                    continue;
                }

                var (key, value) = doc.Components.Schemas.FirstOrDefault(x => x.Key == enumType.FullName);
                if (value != null)
                {
                    param.Description += DescribeEnum(value.Enum, key);
                }
            }
        }
    }

    private static bool TryGetEnumType(Type? type, out Type? enumType)
    {
        try
        {
            if (type.IsEnum)
            {
                enumType = type;
                return true;
            }

            if (type.IsGenericType
                && type.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                var underlyingType = Nullable.GetUnderlyingType(type);
                if (underlyingType != null
                    && underlyingType.IsEnum)
                {
                    enumType = underlyingType;
                    return true;
                }
            }
            else
            {
                var underlyingType = GetTypeIEnumerableType(type);
                if (underlyingType is { IsEnum: true })
                {
                    enumType = underlyingType;
                    return true;
                }

                Type?[] interfaces = type.GetInterfaces();
                foreach (var interfaceType in interfaces)
                {
                    underlyingType = GetTypeIEnumerableType(interfaceType);
                    if (underlyingType is not { IsEnum: true })
                    {
                        continue;
                    }

                    enumType = underlyingType;
                    return true;
                }
            }

            enumType = null;
            return false;
        }
        catch (Exception e)
        {

        }

        throw new InvalidOperationException("Wrong");
    }

    private static Type? GetTypeIEnumerableType(Type? type)
    {
        if (!type.IsGenericType
            || type.GetGenericTypeDefinition() != typeof(IEnumerable<>))
        {
            return null;
        }

        var underlyingType = type.GetGenericArguments()[0];
        return underlyingType.IsEnum ? underlyingType : null;
    }

    private static Type? GetEnumTypeByName(string enumTypeName)
    {
        return AppDomain.CurrentDomain
                        .GetAssemblies()
                        .SelectMany(x => x.GetTypes())
                        .FirstOrDefault(x => x.FullName == enumTypeName);
    }

    private static string? DescribeEnum(IEnumerable<IOpenApiAny> enums, string propertyTypeName)
    {
        var enumType = GetEnumTypeByName(propertyTypeName);
        return enumType == null
            ? null
            : string.Join(", ",
                (from OpenApiInteger enumOption in enums select enumOption.Value into enumInt select $"{enumInt} = {Enum.GetName(enumType, enumInt)}")
                .ToArray());
    }

}