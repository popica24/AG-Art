using AGART.Application.Common.Utilities;
using AGART.Application.OrderModule.Commands.AddToDo;
using AGART.Application.OrderProductModule.Commands;
using AGART.Domain.Order.Models;
using AGART.Domain.OrderProduct.Models;
using AGART.Presentation.API.Models.Order;
using Asp.Versioning;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;

namespace AGART.Presentation.API.Controllers.V1;

[ApiVersion(1)]
[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]
public class WebhookController(ISender sender) : ControllerBase
{
    readonly string endpointSecret = "whsec_3SC18kbkf8C5QZR8DvUPiHQkvpwxINaq";

    [HttpPost]
    public async Task<IActionResult> Index()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        try
        {
            var stripeEvent = EventUtility.ConstructEvent(json,
                Request.Headers["Stripe-Signature"], endpointSecret, throwOnApiVersionMismatch: false);

            if (stripeEvent.Type == Events.CheckoutSessionCompleted)
            {
                if (stripeEvent.Data.Object is not Session checkoutSession)
                {
                    return BadRequest("Invalid sesion object in the webhook event.");
                }

                var userId = checkoutSession.Metadata.TryGetValue("UserId", out string? value) ? value : string.Empty;

                var productDataSerialized = checkoutSession.Metadata.TryGetValue("ProductData", out string? prodData) ? prodData : string.Empty;

                var productData = JsonConvert.DeserializeObject<CreateOrderRequest[]>(productDataSerialized);

                var customerService = new CustomerService();

                var customer = await customerService.GetAsync(checkoutSession.CustomerId);

                var shippingAmount = checkoutSession.RawJObject["shipping_cost"]["amount_total"].ToObject<long>() / 100;

                await HandleCashPayment(productData, customer, userId, (int)shippingAmount);

                return Ok();
            }
            return BadRequest();
        }
        catch (StripeException e)
        {
            return BadRequest(e.Message);
        }
    }

    private async Task HandleCashPayment(CreateOrderRequest[] items, Customer user, string userId, int shippingAmount)
    {
        int total = Enumerable.Sum(items.Select(item => item.price * item.quantity)) + shippingAmount;

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
            PaymentMethod = GlobalConstants.PaymentMethod.Card,
        };
    }

}
