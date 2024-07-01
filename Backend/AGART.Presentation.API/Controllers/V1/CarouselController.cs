using Microsoft.AspNetCore.Cors;
using AGART.Application.CarouselModule.Commands.Update;
using AGART.Application.CarouselModule.Queries.GetCarouselItems;
using AGART.Domain.Carousel.Models;
using AGART.Presentation.API.Models.Carousel;
using Asp.Versioning;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AGART.Presentation.API.Controllers.V1;

[ApiVersion(1)]
[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]
public class CarouselController(ISender sender, IMapper mapper) : ControllerBase
{

    [MapToApiVersion(1)]
    [HttpGet]
    [EnableCors("Admin")]
    public async Task<IActionResult> Get()
    {
        var result = await sender.Send(new GetCarouselQuery());
        return result.MatchFirst(
                r => Ok(r),
                firstError => Problem(firstError.Description)
        );
    }

    [MapToApiVersion(1)]
    [HttpPut("{id}")]
    // [Authorize]
    [EnableCors("Admin")]
    public async Task<IActionResult> Update(int id, UpdateCarouselRequest request)
    {
        var carouselItem = mapper.Map<CarouselItem>(request);
        var result = await sender.Send(new UpdateCarouselCommand(id, carouselItem));
        return result.MatchFirst(
                r => Ok(r),
                firstError => Problem(firstError.Description)
        );
    }
}
