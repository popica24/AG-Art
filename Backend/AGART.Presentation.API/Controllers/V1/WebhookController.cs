using AGART.Presentation.API.Common.SharedMethods;
using AGART.Presentation.API.Models.Order;
using Asp.Versioning;
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
    readonly string endpointSecret = Environment.GetEnvironmentVariable("STRIPE_ES")!;

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

                await CreateOrderAsync(checkoutSession);

                return Ok();
            }
            return BadRequest();
        }
        catch (StripeException e)
        {
            return BadRequest(e.Message);
        }
    }

    private async Task CreateOrderAsync(Session checkoutSession)
    {
        var userId = checkoutSession.Metadata.TryGetValue("UserId", out string? value) ? value : string.Empty;

        var productDataSerialized = checkoutSession.Metadata.TryGetValue("ProductData", out string? prodData) ? prodData : string.Empty;

        var productData = JsonConvert.DeserializeObject<CreateOrderRequest[]>(productDataSerialized);

        var customerService = new CustomerService();

        var customer = await customerService.GetAsync(checkoutSession.CustomerId);

        var shippingAmount = checkoutSession.RawJObject["shipping_cost"]["amount_total"].ToObject<long>() / 100;

        await OrderMethods.AddToDatabase(productData, customer, userId, (int)shippingAmount, sender);
    }


}
