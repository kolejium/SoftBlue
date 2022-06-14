using System.Text.RegularExpressions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace SoftBlue.Common.Helpers;

public static class ConfigurationHelper
{
    private static readonly Regex RxConfigFiles = new Regex("^(?<name>[\\w_-]+)\\.(?<ext>json|yaml)", RegexOptions.IgnoreCase | RegexOptions.Compiled | RegexOptions.Singleline | RegexOptions.CultureInvariant);

    public static ConfigurationManager AddConfigurationFiles(this ConfigurationManager builder, string configFolder = "config")
    {
        var files = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), configFolder), "*.*", SearchOption.AllDirectories).Select<string, string>(f => Path.GetRelativePath(configFolder, f)).Select(f => new
        {
            File = f,
            Folder = Path.GetDirectoryName(f),
            Ext = Path.GetExtension(f)
        }).Where(f => RxConfigFiles.IsMatch(Path.GetFileName(f.File)));

        foreach (var data in files)
        {
            if (Path.GetExtension(data.Ext) != ".json") continue;

            builder.AddJsonFile(Path.Combine(configFolder, data.File), false, true);
        }

        return builder;
    }
}