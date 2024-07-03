using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace AGART.Presentation.API.Controllers.V1
{
    [ApiVersion(1)]
    [ApiController]
    [Route("api/v{v:apiVersion}/[controller]")]
    public class WebhookController : ControllerBase
    {
        readonly string endpointSecret = "whsec_98223f8e0d6ed4b2f95e6a0b1585a07349f5860e0fdcc6a3b01e5128ac30b4cf";

        [HttpPost]
        public async Task<IActionResult> Index(ISender sender)
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], endpointSecret, throwOnApiVersionMismatch: false);

                // Handle the event
                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var paymentIntent = stripeEvent.Data.Object as Session;

                    var service = new SessionService();

                    StripeList<LineItem> lineItems = service.ListLineItems(paymentIntent.Id);

                    //Add the products bought to todo
                }
                else if (stripeEvent.Type == Events.PaymentMethodAttached)
                {
                    var paymentMethod = stripeEvent.Data.Object as PaymentMethod;
                    Console.WriteLine("PaymentMethod was attached to a Customer!");
                }
                // ... handle other event types
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }

                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}