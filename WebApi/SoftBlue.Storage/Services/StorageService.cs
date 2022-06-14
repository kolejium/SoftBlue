using SoftBlue.Library.Database.Contexts;
using SoftBlue.Storage.Interfaces;

namespace SoftBlue.Storage.Services;

public class StorageService : IStorageService
{
    #region [ Variabales ]

    private readonly string _path;

    #endregion

    #region [ Constructors ]

    public StorageService(string path)
    {
        _path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, path);

        if (!Directory.Exists(_path)) 
            Directory.CreateDirectory(_path);
    }

    #endregion


    public async Task<byte[]> Load(Guid id)
    {
        await using var fs = new FileStream(Path.Combine(_path, id.ToString()), FileMode.Open, FileAccess.ReadWrite);
        using var ms = new MemoryStream();

        await fs.CopyToAsync(ms);
        return ms.ToArray();
    }

    public async Task<bool> Delete(Guid id)
    {
        if (!File.Exists(Path.Combine(_path, id.ToString()))) return false;
        File.Delete(Path.Combine(_path, id.ToString()));

        return true;

    }

    public async Task Save(Guid id, Stream stream)
    {
        await using var fs = new FileStream(Path.Combine(_path, id.ToString()), FileMode.Create,
            FileAccess.Write, FileShare.ReadWrite);
        await using (stream)
        {
            stream.Seek(0, SeekOrigin.Begin);
            await stream.CopyToAsync(fs);
        }
    }
}