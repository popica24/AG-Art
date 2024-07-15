namespace AGART.Application.Common.DTO.Order;
public class OrderDTO(Domain.Order.Models.Order order)
{
    public string? Name { get; set; } = order.Name;
    public int Price { get; set; } = order.Price;
    public int Quantity { get; set; } = order.Quantity;
    public string City { get; set; } = order.City;
    public string AddressLine1 { get; set; } = order.AddressLine1;
    public string AddressLine2 { get; set; } = order.AddressLine2;
    public string PostalCode { get; set; } = order.PostalCode;
    public string State { get; set; } = order.State;
    public string Phone { get; set; } = order.Phone;
    public string ClientName { get; set; } = order.Phone;
}
