using Microsoft.AspNetCore.Http;

namespace SoftBlue.Storage.Dto.Requests;

public class UploadRequest
{
    public Guid Id { get; set; }
    public IFormFile Source { get; set; }
}