using AGART.Application.Common.Utilities;
using AGART.Application.OrderModule.Commands.AddToDo;
using AGART.Application.OrderModule.Queries.GetOrdersForUser;
using AGART.Application.OrderProductModule.Commands;
using AGART.Domain.Order.Models;
using AGART.Domain.OrderProduct.Models;
using AGART.Presentation.API.Models.Order;
using Asp.Versioning;
using FirebaseAdmin.Auth;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;


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

    [HttpPost]
    [Authorize]
    [MapToApiVersion(1)]
    [EnableCors("User")]
    public async Task<IActionResult> Create([FromQuery] string customer, [FromQuery] string userId, [FromQuery] string paymentType, [FromBody] CreateOrderRequest[] items)
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

        if (paymentType == GlobalConstants.PaymentMethod.Card)
        {
            var url = await HandleCardPayment(items, user, userId);
            return Ok(url);
        }
        if (paymentType == GlobalConstants.PaymentMethod.Cash)
        {
            await HandleCashPayment(items, user, userId);
            return Ok();
        }
        return BadRequest("No payment method that is supported was specified.");

    }

    private static Order CreateOrder(Customer user, string userId, int total)
    {
        var id = new Random().Next(1000000, 9999999);
        return new Order
        {
            Id = id,
            Total = total,
            ClientName = user.Name,
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
            Done = false,
            PlacedAt = DateTime.UtcNow,
            PaymentMethod = GlobalConstants.PaymentMethod.Cash,
        };
    }

    private static async Task<Customer?> GetCustomerAsync(string customerId)
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

    private async Task HandleCashPayment(CreateOrderRequest[] items, Customer user, string userId)
    {
        int total = Enumerable.Sum(items.Select(item => item.price * item.quantity));

        var orderBody = CreateOrder(user, userId, total);
        var orderRequest = new AddToDoCommand(orderBody);

        await sender.Send(orderRequest);

        foreach (var item in items)
        {
            var orderProduct = new OrderProduct
            {
                ProductId = item.id,
                ClientId = userId,
                OrderId = orderBody.Id,
                Quantity = item.quantity,
                Variant = item.variant
            };
            var orderProductRequest = new AddOrderProductCommand(orderProduct);
            await sender.Send(orderProductRequest);
        }
    }

    private static async Task<string> HandleCardPayment(CreateOrderRequest[] items, Customer user, string userId)
    {
        var lineItems = new List<SessionLineItemOptions>();

        foreach (var item in items)
        {
            lineItems.Add(new SessionLineItemOptions
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    Currency = "ron",
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = $"{item.name} - {item.variant}",
                        Images = [item.imagePath]
                    },
                    UnitAmountDecimal = item.price * 100,
                },
                Quantity = item.quantity,
            });
        }

        var itemsData = items.Select(item => new { item.id, item.price, item.quantity, item.variant }).ToList();

        var options = new SessionCreateOptions
        {
            Customer = user.Id,
            LineItems = lineItems,
            PaymentMethodTypes = ["card"],
            Mode = "payment",
            SuccessUrl = "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",

            Metadata = new Dictionary<string, string>
            {
                { "UserId", userId },
                {"ProductData", JsonConvert.SerializeObject(itemsData)}
            },
            AllowPromotionCodes = true,
        };

        var service = new SessionService();
        Session session = await service.CreateAsync(options);

        return session.Url;
    }
}
