namespace AGART.Application.Common.DTO.Order;
public class OrderDTO(Domain.Order.Models.Order order)
{
    public int Id { get; set; } = order.Id;
    public string? Name { get; set; } = order.Name;
    public int Price { get; set; } = order.Price;
    public int Quantity { get; set; } = order.Quantity;
    public string ShippingCity { get; set; } = order.ShippingCity;
    public string ShippingCountry { get; set; } = order.ShippingCountry;
    public string ShippingAddress { get; set; } = order.ShippingAddress;
    public string ShippingPostalCode { get; set; } = order.ShippingPostalCode;
    public string ShippingState { get; set; } = order.ShippingState;
    public string BillingCity { get; set; } = order.BillingCity;
    public string BillingCountry { get; set; } = order.BillingCountry;
    public string BillingAddress { get; set; } = order.BillingAddress;
    public string BillingPostalCode { get; set; } = order.BillingPostalCode;
    public string BillingState { get; set; } = order.BillingState;
    public string ClientName { get; set; } = order.ClientName;
}
