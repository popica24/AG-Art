using AGART.Application.Common.Utilities;
using AGART.Application.OrderModule.Commands.AddToDo;
using AGART.Application.OrderProductModule.Commands;
using AGART.Domain.Order.Models;
using AGART.Domain.OrderProduct.Models;
using AGART.Presentation.API.Models.Order;
using MediatR;
using Stripe;

namespace AGART.Presentation.API.Common.SharedMethods
{
    public static class OrderMethods
    {
        private static Order Create(Customer user, string userId, int total, string paymentMethod)
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
                PaymentMethod = paymentMethod,
            };
        }

        public static async Task AddToDatabase(CreateOrderRequest[] items, Customer user, string userId, int shippingAmount, ISender sender)
        {
            int total = Enumerable.Sum(items.Select(item => item.price * item.quantity)) + shippingAmount;

            var orderBody = Create(user, userId, total, GlobalConstants.PaymentMethod.Card);

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
    }
}