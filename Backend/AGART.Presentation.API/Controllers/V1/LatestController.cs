using AGART.Application.ProductModule.Commands.GetLatestAdded;
using Asp.Versioning;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AGART.Presentation.API.Controllers.V1;

[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]
public class LatestController(ISender sender) : ControllerBase
{

    /// <summary>
    /// This endpoint gets the latest added products.
    /// </summary>
    /// <respone code="200">List of latest added products</respone>
    [EnableCors("User")]
    [MapToApiVersion(1)]
    [HttpGet]

    public async Task<IActionResult> Index()
    {
        var result = await sender.Send(new GetLatestAddedQuery());
        return result.MatchFirst(
            r => Ok(r),
            firstError => Problem(firstError.Description)
        );
    }
}
