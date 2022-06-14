using Microsoft.AspNetCore.Http;

namespace SoftBlue.Library.Dto.Book.Requests;

public class CreateBookWithFileRequest : CreateBookRequest
{
    public IFormFile? Source { get; set; }
}