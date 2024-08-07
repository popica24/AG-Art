using AGART.Application.Common.DTO.Order;
using AGART.Application.Common.DTO.Product;
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Order.Models;
using AGART.Domain.OrderProduct.Models;
using AGART.Domain.Product.Models;
using MediatR;

namespace AGART.Application.OrderModule.Queries.GetOrdersForUser;

public class GetOrderForUserQueryHandler(IUnitOfWork uow) : IRequestHandler<GetOrderForUserQuery, IEnumerable<OrderDTO>>
{
    public async Task<IEnumerable<OrderDTO>> Handle(GetOrderForUserQuery request, CancellationToken cancellationToken)
    {
        var orderProductsGrouped = uow.OrderProduct.Get(request.uId);
        var OrderDTOs = new List<OrderDTO>();
        foreach (var orderProduct in orderProductsGrouped)
        {
            var first = orderProduct.FirstOrDefault();
            if (first == null || first.Order == null || first.Product == null)
            {
                continue;
            }
            var Order = new OrderDTO
            {
                Id = first.OrderId,
                Total = first.Order.Total,
                ClientName = first.Order.ClientName,
                ShippingCity = first.Order.ShippingCity,
                ShippingAddress = first.Order.ShippingAddress,
                ShippingCountry = first.Order.ShippingCountry,
                ShippingPostalCode = first.Order.ShippingPostalCode,
                ShippingState = first.Order.ShippingState,
                BillingCity = first.Order.BillingCity,
                BillingCountry = first.Order.BillingCountry,
                BillingAddress = first.Order.BillingAddress,
                BillingPostalCode = first.Order.BillingPostalCode,
                BillingState = first.Order.BillingState,
                PaymentMethod = first.Order.PaymentMethod,
                PlacedAt = first.Order.PlacedAt.Value.ToShortDateString(),
                Products = []
            };
            foreach (var prod in orderProduct)
            {
                if (Order.Products.FirstOrDefault(p => p.Id == prod.Product.Id && p.Variant == prod.Variant) != null)
                {
                    continue;
                }
                Order.Products.Add(new ProductOrderDTO
                {
                    Id = prod.Product.Id,
                    Name = prod.Product.Name,
                    Material = prod.Product.Material,
                    Description = prod.Product.Description,
                    Dimensions = prod.Product.Dimensions,
                    LightSource = prod.Product.LightSource,
                    Price = prod.Product.Price,
                    PercentOff = prod.Product.PercentOff,
                    Quantity = prod.Quantity,
                    Variant = prod.Variant
                });
            }
            OrderDTOs.Add(Order);
        }
        return OrderDTOs;
    }
}
