using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using AGART.Application.ProductModule.Queries.GetRecommended;

namespace AGART.Presentation.API.Controllers.V1
{
    [ApiController]
    [Route("api/[controller]")]
    public class Recommended(ISender sender) : ControllerBase
    {
        /// <summary>
        /// This endpoint gets the recommended products.
        /// </summary>
        /// <respone code="200">List of recommended products</respone>
        [EnableCors("User")]
        [MapToApiVersion(1)]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var result = await sender.Send(new GetRecommendedQuery());
            return result.MatchFirst(
                r => Ok(r),
                firstError => Problem(firstError.Description)
            );
        }

    }
}