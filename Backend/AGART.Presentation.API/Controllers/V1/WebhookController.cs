using Asp.Versioning;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace AGART.Presentation.API.Controllers.V1;

[ApiVersion(1)]
[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]
public class WebhookController : ControllerBase
{
    readonly string endpointSecret = "whsec_98223f8e0d6ed4b2f95e6a0b1585a07349f5860e0fdcc6a3b01e5128ac30b4cf";

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

            }
            return BadRequest();
        }
        catch (StripeException e)
        {
            return BadRequest(e.Message);
        }
    }
    
}
