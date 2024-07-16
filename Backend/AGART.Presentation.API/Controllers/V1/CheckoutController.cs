using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using Asp.Versioning;
using Microsoft.AspNetCore.Cors;
using AGART.Presentation.API.Models.Order;

namespace AGART.Presentation.API.Controllers.V1
{
    [ApiVersion(1)]
    [ApiController]
    [Route("api/v{v:apiVersion}/[controller]")]
    public class CheckoutController : ControllerBase
    {
        [HttpPost]
        [EnableCors("User")]
        public async Task<IActionResult> Index([FromQuery] string customer, [FromQuery] string userId, [FromBody] CreateOrderRequest[] items)
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

            var options = new SessionCreateOptions
            {
                Customer = customer,
                LineItems = lineItems,
                PaymentMethodTypes = ["card"],
                Mode = "payment",
                SuccessUrl = "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",

                Metadata = new Dictionary<string, string>
            {
                { "UserId", userId }
            },
                AllowPromotionCodes = true,
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);

            return Ok(new { url = session.Url });
        }

    }
}