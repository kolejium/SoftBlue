using Microsoft.AspNetCore.Mvc;
using SoftBlue.Storage.Dto.Requests;
using SoftBlue.Storage.Interfaces;

namespace SoftBlue.Storage;

[Route("api/[controller]")]
[ApiController]
public class StorageController : ControllerBase
{
    #region [ Variabales ]

    private readonly IStorageService _service;

    #endregion

    #region [ Constructors ]

    public StorageController(IStorageService service)
    {
        _service = service;
    }

    #endregion

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        try
        {
            return Ok(await _service.Load(id));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpPost]
    public async Task<IActionResult> UploadFile([FromForm] UploadRequest viewModel)
    {
        try
        {
            await _service.Save(viewModel.Id, viewModel.Source.OpenReadStream());

            return Ok();
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _service.Delete(id);

            return Ok();
        }
        catch
        {
            return NotFound();
        }
    }
}