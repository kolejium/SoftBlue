using System.ComponentModel.DataAnnotations;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SoftBlue.Common.Operation;
using SoftBlue.Common.Responses;
using SoftBlue.Library.Dto.Bookcase;
using SoftBlue.Library.Dto.Bookcase.Requests;
using SoftBlue.Library.Features.Bookcase.Interfaces;

namespace SoftBlue.Library.Features.Bookcase
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookcaseController : ControllerBase
    {
        private readonly ILogger<BookcaseController> _logger;
        private readonly IBookcaseService _bookcaseService;

        public BookcaseController(IBookcaseService bookService, ILogger<BookcaseController> logger)
        {
            _logger = logger;
            _bookcaseService = bookService;
        }

        [ProducesResponseType(typeof(BookcaseDto), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpPost]
        public async Task<OActionResult<OperationResult<BookcaseDto>>> Create([FromBody] CreateBookcaseRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookcaseService.Create(request);
        }

        [ProducesResponseType(typeof(BookcaseDto), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpDelete("{id}")]
        public async Task<OActionResult<OperationResult<BookcaseDto>>> Delete([FromRoute, Required] Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookcaseService.Delete(id);
        }

        [ProducesResponseType(typeof(BookcaseDto), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpGet("{id}")]
        public async Task<OActionResult<OperationResult<BookcaseDto>>> Get([FromRoute, Required] Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookcaseService.Get(id);
        }

        [ProducesResponseType(typeof(PagedResponse<BookcaseDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(NotFoundObjectResult), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
        [HttpGet]
        public async Task<OActionResult<OperationResult<PagedResponse<BookcaseDto>>>> Get([FromQuery] GetBookcasesRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return await _bookcaseService.Get(request);
        }
    }
}
