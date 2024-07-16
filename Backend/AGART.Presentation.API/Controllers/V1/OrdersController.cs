using AGART.Application.Common.Utilities;
using AGART.Application.OrderModule.Commands.AddToDo;
using AGART.Application.OrderModule.Queries.GetOrdersForUser;
using AGART.Domain.Order.Models;
using AGART.Presentation.API.Models.Order;
using Asp.Versioning;
using FirebaseAdmin.Auth;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stripe;


namespace AGART.Presentation.API.Controllers.V1;

[ApiVersion(1)]
[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]
public class OrdersController(ISender sender, IMapper mapper) : ControllerBase
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

    [HttpPost]
    [Authorize]
    [MapToApiVersion(1)]
    [EnableCors("User")]
    public async Task<IActionResult> Create([FromQuery] string customer, [FromQuery] string userId, [FromBody] CreateOrderRequest[] items)
    {
        if (items.Length == 0 || items == null)
        {
            return BadRequest("No orders in the cart");
        }

        var user = await GetCustomerAsync(customer);

        if (user == null)
        {
            return BadRequest($"No user found for the id {customer}");
        }

        foreach (var order in items)
        {
            var orderBody = CreateOrder(order, user, userId);
            var orderRequest = new AddToDoCommand(orderBody);
            await sender.Send(orderRequest);
        }

        return Ok();
    }

    private static Order CreateOrder(CreateOrderRequest order, Customer user, string userId)
    {
        return new Order
        {
            Name = order.name,
            Price = order.price,
            Quantity = order.quantity,
            ShippingCity = user.Shipping.Address.City,
            ShippingCountry = user.Shipping.Address.Country,
            ShippingAddress = user.Shipping.Address.Line1,
            ShippingPostalCode = user.Shipping.Address.PostalCode,
            ShippingState = user.Shipping.Address.State,
            BillingCity = !string.IsNullOrEmpty(user.Address.City) ? user.Address.City : user.Shipping.Address.City,
            BillingCountry = !string.IsNullOrEmpty(user.Address.Country) ? user.Address.Country : user.Shipping.Address.Country,
            BillingAddress = !string.IsNullOrEmpty(user.Address.Line1) ? user.Address.Line1 : user.Shipping.Address.Line1,
            BillingPostalCode = !string.IsNullOrEmpty(user.Address.PostalCode) ? user.Address.PostalCode : user.Shipping.Address.PostalCode,
            BillingState = !string.IsNullOrEmpty(user.Address.State) ? user.Address.State : user.Shipping.Address.State,
            ClientName = user.Name,
            Done = false,
            PaymentMethod = GlobalConstants.PaymentMethod.Cash,
            UserId = userId
        };
    }

    private async Task<Customer?> GetCustomerAsync(string customerId)
    {
        var _customerService = new CustomerService();
        try
        {
            return await _customerService.GetAsync(customerId);
        }
        catch (Exception ex)
        {
            return null;
        }
    }
}
