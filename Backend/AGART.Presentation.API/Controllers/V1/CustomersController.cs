using Asp.Versioning;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AGART.Presentation.API.Controllers.V1
{

    [ApiVersion(1)]
    [ApiController]
    [Route("api/v{v:apiVersion}/[controller]")]
    [EnableCors("AdminOnly")]
    public class CustomersController : ControllerBase
    {
        [HttpGet]
        [MapToApiVersion(1)]
        public async Task<IActionResult> Get()
        {
            return Ok();
        }
    }
}