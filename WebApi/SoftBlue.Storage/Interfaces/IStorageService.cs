using SoftBlue.Common.Operation;

namespace SoftBlue.Storage.Interfaces;

public interface IStorageService
{
    Task<byte[]> Load(Guid id);

    Task<bool> Delete(Guid id);

    Task Save(Guid id, Stream stream);
}