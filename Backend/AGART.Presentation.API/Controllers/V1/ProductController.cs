using AGART.Application.ProductModule.Commands.Create;
using AGART.Application.ProductModule.Commands.Update;
using AGART.Application.ProductModule.Queries.GetProduct;
using AGART.Application.ProductModule.Queries.GetProducts;
using AGART.Domain.Product.Models;
using AGART.Presentation.API.Models.Product;
using Asp.Versioning;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AGART.Presentation.API.Controllers.V1;

[ApiVersion(1)]
[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]

public class ProductController(ISender sender, IMapper mapper) : ControllerBase
{
    /// <summary>
    /// This endpoint gets the product coresponding to the id you request.
    /// </summary>
    /// <respone code="200">Returns the product you request</respone>
    [EnableCors("User")]
    [MapToApiVersion(1)]
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var result = await sender.Send(new GetProductQuery(id));
        if (!result.Value.Visible)
        {
            return Forbid();
        }
        return result.MatchFirst(
                r => Ok(r),
                firstError => Problem(firstError.Description)
        );
    }

    /// <summary>
    /// This endpoint gets all the products in the database.
    /// </summary>
    /// <respone code="200">Returns the whole product catalogue</respone>
    [EnableCors("AdminOnly")]
    [MapToApiVersion(1)]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await sender.Send(new GetProductsQuery());
        return result.MatchFirst(
            r => Ok(r),
            firstError => Problem(firstError.Description)
        );
    }

    /// <summary>
    /// This endpoint creates a product.
    /// </summary>
    /// <respone code="200">Product is created</respone>
    [EnableCors("AdminOnly")]
    [MapToApiVersion(1)]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Post(CreateProductRequest request)
    {
        var createProductCommand = mapper.Map<CreateProductCommand>(request);
        var result = await sender.Send(createProductCommand);
        return result.MatchFirst(
            r => Ok(r),
            firstError => Problem(firstError.Description)
        );
    }

    /// <summary>
    /// This endpoint updates a product.
    /// </summary>
    /// <respone code="200">Product is updated</respone>
    [EnableCors("AdminOnly")]
    [MapToApiVersion(1)]
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, ProductUpdateParams parameters)
    {
        var product = mapper.Map<Product>(parameters);

        var result = await sender.Send(new UpdateProductCommand(id, product));
        return result.MatchFirst(
            Ok,
            firstError => Problem(firstError.Description)
        );
    }
}