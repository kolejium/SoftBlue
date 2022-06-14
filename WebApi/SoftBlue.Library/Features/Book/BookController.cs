using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Mime;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SoftBlue.Common.Operation;
using SoftBlue.Common.Responses;
using SoftBlue.Library.Dto.Book;
using SoftBlue.Library.Dto.Book.Requests;
using SoftBlue.Library.Features.Book.Interfaces;
using SoftBlue.Storage.Dto.Requests;
using SoftBlue.Storage.Dto.Responses;

namespace SoftBlue.Library.Features.Book
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces(MediaTypeNames.Application.Json)]
    public class BookController : ControllerBase
    {
        private readonly ILogger<BookController> _logger;
        private readonly IBookService _bookService;

        public BookController(IBookService bookService, ILogger<BookController> logger)
        {
            _logger = logger;
            _bookService = bookService;
        }

        [ProducesResponseType(typeof(BookDto), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpPost]
        public async Task<OActionResult<OperationResult<BookDto>>> Create([FromBody] CreateBookRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookService.Create(request);
        }

        [ProducesResponseType(typeof(BookDto), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpPost("with-file")]
        public async Task<OActionResult<OperationResult<BookDto>>> Create([FromForm] WithFileRequestT<CreateBookRequest> request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookService.Create(request);
        }

        [ProducesResponseType(typeof(BookDto), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpDelete("{id}")]
        public async Task<OActionResult<OperationResult<BookDto>>> Delete([FromRoute, Required] Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookService.Delete(id);
        }

        [ProducesResponseType(typeof(BookDto), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpGet("{id}")]
        public async Task<OActionResult<OperationResult<BookDto>>> Get([FromRoute, Required] Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookService.Get(id);
        }

        [ProducesResponseType(typeof(BookDto), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpGet("{id}/pdf")]
        public async Task<OActionResult<OperationResult<string>>> GetPdf([FromRoute, Required] Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookService.GetPdf(id);
        }

        [ProducesResponseType(typeof(PagedResponse<BookDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpGet]
        public async Task<OActionResult<OperationResult<PagedResponse<BookDto>>>> Get([FromQuery] GetBooksRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookService.Get(request);
        }

        [ProducesResponseType(typeof(PagedResponse<BookDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpPatch]
        public async Task<OActionResult<OperationResult<BookDto>>> Update([FromBody] UpdateBookRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookService.Update(request);
        }

        [ProducesResponseType(typeof(PagedResponse<BookDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpPatch("with-file")]
        public async Task<OActionResult<OperationResult<BookDto>>> Update([FromForm] WithFileRequestT<UpdateBookRequest> request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookService.Update(request);
        }

        [ProducesResponseType(typeof(PagedResponse<BookDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpPost("upload")]
        public async Task<OActionResult<OperationResult<UploadResponse>>> Upload([FromForm] UploadRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            return await _bookService.Upload(request);
        }
    }
}
