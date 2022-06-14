namespace SoftBlue.Storage.Dto.Responses;

public class UploadResponse
{
    public long Offset { get; set; }

    public long Size { get; set; }

    public Guid FileId { get; set; }
}