using AGART.Application.OrderModule.Queries.GetOrdersForUser;
using Asp.Versioning;
using FirebaseAdmin.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;


namespace AGART.Presentation.API.Controllers.V1;

[ApiVersion(1)]
[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]
public class OrdersController(ISender sender) : ControllerBase
{
    [HttpGet]
    [Authorize]
    [MapToApiVersion(1)]
    [EnableCors("User")]
    public async Task<IActionResult> Get()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

        var getOrdersQuery = new GetOrderForUserQuery(decoded.Uid);

        var items = await sender.Send(getOrdersQuery);

        return Ok(items);
    }
}
