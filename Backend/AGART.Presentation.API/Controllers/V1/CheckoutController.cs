using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using Asp.Versioning;
using AGART.Presentation.API.Models.Checkout;
using Microsoft.AspNetCore.Cors;

namespace AGART.Presentation.API.Controllers.V1
{
    [ApiVersion(1)]
    [ApiController]
    [Route("api/v{v:apiVersion}/[controller]")]
    public class CheckoutController : ControllerBase
    {
        [HttpPost]
        [EnableCors("User")]
        public async Task<IActionResult> Index([FromBody] CheckoutItem[] items)
        {

            var lineItems = new List<SessionLineItemOptions>();

            var productService = new ProductService();

            var productGetOptions = new ProductGetOptions
            {
                Expand = ["default_price"]
            };

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
                LineItems = lineItems,
                PaymentMethodTypes = ["card"],
                Mode = "payment",
                SuccessUrl = "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
                PhoneNumberCollection = new SessionPhoneNumberCollectionOptions
                {
                    Enabled = true,
                },
                ShippingAddressCollection = new SessionShippingAddressCollectionOptions
                {
                    AllowedCountries =
                [
                    "RO"
                ],
                },
                AllowPromotionCodes = true,
                CustomerCreation = "always"
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);

            return Ok(new { url = session.Url });
        }

    }
}