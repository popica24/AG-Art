using AGART.Application.OrderModule.Commands.AddToDo;
using Asp.Versioning;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using Order = AGART.Domain.Order.Models.Order;

namespace AGART.Presentation.API.Controllers.V1;

[ApiVersion(1)]
[ApiController]
[Route("api/v{v:apiVersion}/[controller]")]
public class WebhookController : ControllerBase
{
    private readonly CustomerService _customerService;
    private readonly SessionService _sessionService;
    private readonly ISender _sender;

    public WebhookController(ISender sender)
    {
        _sender = sender;
        _customerService = new CustomerService();
        _sessionService = new SessionService();
    }
    readonly string endpointSecret = "whsec_98223f8e0d6ed4b2f95e6a0b1585a07349f5860e0fdcc6a3b01e5128ac30b4cf";

    [HttpPost]
    public async Task<IActionResult> Index(ISender sender, IMapper mapper)
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

                var customer = await GetCustomerAsync(checkoutSession.CustomerId);

                if (customer == null)
                {
                    return BadRequest($"Customer with the ID {checkoutSession.CustomerId} not found.");
                }

                var lineItems = await GetLineItemsAsync(checkoutSession.Id);

                var userId = checkoutSession.Metadata.TryGetValue("UserId", out string? value) ? value : string.Empty;

                foreach (var item in lineItems)
                {
                    try
                    {
                        var order = CreateOrder(item, userId, customer.Shipping, customer.Address);
                        await _sender.Send(new AddToDoCommand(order));
                    }
                    catch (Exception ex)
                    {
                        return BadRequest($"Error creating order for line item {item.Id} : {ex.Message}");
                    }
                }
            }

            return Ok();
        }
        catch (StripeException e)
        {
            return BadRequest(e.Message);
        }
    }

    private async Task<Customer?> GetCustomerAsync(string customerId)
    {
        try
        {
            return await _customerService.GetAsync(customerId);
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    private async Task<StripeList<LineItem>?> GetLineItemsAsync(string sessionId)
    {
        try
        {
            return await _sessionService.ListLineItemsAsync(sessionId);
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    private Order CreateOrder(LineItem item, string userId, Shipping shipping, Address address)
    {
        return new Order();
    }
}
