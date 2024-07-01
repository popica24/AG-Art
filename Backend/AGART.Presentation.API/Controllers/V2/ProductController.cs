using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Product.Models;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

namespace AGART.Presentation.API.Controllers.V2;

[ApiVersion(2)]
[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]

public class ProductController(IUnitOfWork uow) : ControllerBase
{
    [MapToApiVersion(2)]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var items = new List<Product>();
        return Ok(items.ToList());
    }
}