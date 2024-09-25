
using AGART.Application.VariantModule.Commands.Create;
using AGART.Application.VariantModule.Commands.Delete;
using AGART.Application.VariantModule.Queries.GetProductVariants;
using AGART.Application.VariantModule.Queries.GetVariant;
using AGART.Presentation.API.Models.Variant;
using Asp.Versioning;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AGART.Presentation.API.Controllers.V1;

[ApiVersion(1)]
[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]
public class VariantController(ISender sender, IMapper mapper) : ControllerBase
{
    [HttpGet("{productId}")]
    [MapToApiVersion(1)]
    [EnableCors("Admin")]
    public async Task<IActionResult> Get(int productId)
    {
        var result = await sender.Send(new GetProductVariantsQuery(productId));
        return result.MatchFirst(
        r => Ok(r),
        firstError => Problem(firstError.Description)
    );
    }


    [EnableCors("Admin")]
    [HttpGet("{productId}/{id}")]
    [MapToApiVersion(1)]
    public async Task<IActionResult> Get(int productId, int id)
    {
        var result = await sender.Send(new GetVariantQuery(productId, id));
        return result.MatchFirst(
        r => Ok(r),
        firstError => Problem(firstError.Description)
    );
    }

    [HttpDelete("{id}")]
    [MapToApiVersion(1)]
    [EnableCors("AdminOnly")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await sender.Send(new DeleteVariantCommand(id));
        return result.MatchFirst(
        r => Ok(r),
        firstError => Problem(firstError.Description)
    );
    }

    [HttpPost]
    [MapToApiVersion(1)]
    [EnableCors("AdminOnly")]
    public async Task<IActionResult> Post(CreateVariantRequest request)
    {
        var command = mapper.Map<CreateVariantCommand>(request);
        var result = await sender.Send(command);
        return result.MatchFirst(
        r => Ok(r),
        firstError => Problem(firstError.Description));
    }
}
