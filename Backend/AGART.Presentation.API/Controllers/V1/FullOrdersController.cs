using AGART.Application.OrderModule.Queries.GetOrders;
using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AGART.Presentation.API.Controllers.V1
{
    [ApiVersion(1)]
    [ApiController]
    [Route("api/v{v:apiVersion}/[controller]")]
    public class FullOrdersController(ISender sender) : ControllerBase
    {
        [HttpGet]
        [MapToApiVersion(1)]
        [EnableCors("AdminOnly")]
        public async Task<IActionResult> FullGet()
        {
            var getOrdersQuery = new GetOrdersQuery();

            var items = await sender.Send(getOrdersQuery);

            return Ok(items);
        }
    }
}