
using AGART.Application.ProductModule.Queries.SearchProduct;
using AGART.Domain.Product;
using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AGART.Presentation.API.Controllers.V1;

[ApiVersion(1)]
[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]
public class SearchController(ISender sender) : ControllerBase
{
    /// <summary>
    /// This endpoint searches products based off the query parameters.
    /// </summary>
    /// <respone code="200">Returns the list of products coresponding to the parameters</respone>
    [MapToApiVersion(1)]
    [HttpPost]
    [EnableCors("Admin")]
    public async Task<IActionResult> Index([FromBody] ProductQueryParameters parameters)
    {
        var result = await sender.Send(new SearchProductQuery(parameters));
        return result.MatchFirst(
                r => Ok(r),
                firstError => Problem(firstError.Description)
        );
    }
}
