using Microsoft.AspNetCore.Http;

namespace SoftBlue.Library.Dto.Book.Requests;

public class WithFileRequestT<T>
{
    public T Value { get; set; }

    public IFormFile? Source { get; set; }
}