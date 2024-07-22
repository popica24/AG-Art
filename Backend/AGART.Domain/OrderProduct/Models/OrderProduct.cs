using System.Text.Json.Serialization;
using AGART.Domain.Common.Models;
using AGART.Domain.Order.Models;

namespace AGART.Domain.OrderProduct.Models;
public class OrderProduct : IEntity
{
    public int Id { get; set; }
    public string ClientId { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public string Variant { get; set; }
    public Order.Models.Order? Order { get; set; }
    public Product.Models.Product? Product { get; set; }
}
