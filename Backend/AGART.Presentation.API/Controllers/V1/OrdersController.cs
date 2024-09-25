using AGART.Application.Common.Utilities;
using AGART.Application.OrderModule.Queries.GetOrdersForUser;
using AGART.Presentation.API.Common.SharedMethods;
using AGART.Presentation.API.Models.Order;
using Asp.Versioning;
using FirebaseAdmin.Auth;
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
    readonly string APP_DOMAIN = Environment.GetEnvironmentVariable("APP_DOMAIN")!;

    const int ShippingFee = 15;

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
            var url = await CreateCheckoutSession(items, user, userId);
            return Ok(url);
        }
        if (paymentType == GlobalConstants.PaymentMethod.Cash)
        {
            await OrderMethods.AddToDatabase(items, user, userId, ShippingFee, sender);
            return Ok(APP_DOMAIN + "?from-checkout-redirect=true");
        }
        return BadRequest("No payment method that is supported was specified.");

    }

    private static async Task<Customer?> GetCustomerAsync(string customerId)
    {
        var _customerService = new CustomerService();
        try
        {
            return await _customerService.GetAsync(customerId);
        }
        catch
        {
            return null;
        }
    }

    private async Task<string> CreateCheckoutSession(CreateOrderRequest[] items, Customer user, string userId)
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
            SuccessUrl = APP_DOMAIN + "?from-checkout-redirect=true",
            ShippingOptions = [
            new() {
                ShippingRateData = new SessionShippingOptionShippingRateDataOptions
                {
                    Type = "fixed_amount",
                    DisplayName = "Livrare la domiciliu",
                    FixedAmount = new SessionShippingOptionShippingRateDataFixedAmountOptions
                    {
                        Amount = ShippingFee * 100,
                        Currency = "ron",
                    },
                    DeliveryEstimate = new SessionShippingOptionShippingRateDataDeliveryEstimateOptions
                    {
                        Minimum = new SessionShippingOptionShippingRateDataDeliveryEstimateMinimumOptions
                        {
                            Unit = "business_day",
                            Value = 5,
                        },
                        Maximum = new SessionShippingOptionShippingRateDataDeliveryEstimateMaximumOptions
                        {
                            Unit = "business_day",
                            Value = 7,
                        },
                    },
                },
            }],
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
