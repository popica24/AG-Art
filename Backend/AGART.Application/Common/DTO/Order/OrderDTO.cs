using AGART.Application.Common.DTO.Product;
using AGART.Domain.OrderProduct.Models;

namespace AGART.Application.Common.DTO.Order;
public class OrderDTO
{
    public int Id { get; set; }
    public int Total { get; set; }
    public string ClientName { get; set; }
    public string ShippingCity { get; set; } = string.Empty;
    public string ShippingCountry { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string ShippingPostalCode { get; set; } = string.Empty;
    public string ShippingState { get; set; } = string.Empty;
    public string BillingCity { get; set; } = string.Empty;
    public string BillingCountry { get; set; } = string.Empty;
    public string BillingAddress { get; set; } = string.Empty;
    public string BillingPostalCode { get; set; } = string.Empty;
    public string BillingState { get; set; } = string.Empty;
    public string PaymentMethod { get; set; }
    public string PlacedAt { get; set; }
    public List<ProductOrderDTO> Products { get; set; }

    public OrderDTO()
    {

    }
    // public OrderDTO(OrderProduct op)
    // {
    //     Id = op.Order.Id;
    //     Total = op.Order.Total;
    //     ClientName = op.Order.ClientName;
    //     ShippingCity = op.Order.ShippingCity;
    //     ShippingCountry = op.Order.ShippingCity;
    //     ShippingAddress = op.Order.ShippingCity;
    //     ShippingPostalCode = op.Order.ShippingCity;
    //     ShippingState = op.Order.ShippingCity;
    //     BillingCity = op.Order.ShippingCity;
    //     BillingCountry = op.Order.ShippingCity;
    //     BillingAddress = op.Order.ShippingCity;
    //     BillingPostalCode = op.Order.ShippingCity;
    //     BillingState = op.Order.ShippingCity;
    //     PaymentMethod = op.Order.PaymentMethod;
    //     PlacedAt = op.Order.PlacedAt.Value.ToShortDateString();
    //     Products = op.
    // }
}
