using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using AGART.Domain.Common.Models;
using AGART.Domain.Product.Models;

namespace AGART.Domain.Order.Models;

public class Order : IEntity
{
    [Key]
    public int Id { get; set; }
    public int Total { get; set; }
    public string Email { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
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
    public bool Done { get; set; }
    public DateTime? PlacedAt { get; set; }

    [JsonIgnore]
    public List<OrderProduct.Models.OrderProduct> OrderProducts { get; set; }
}