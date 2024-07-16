using System.ComponentModel.DataAnnotations;
using AGART.Domain.Common.Models;

namespace AGART.Domain.Order.Models;

public class Order : IEntity
{
    [Key]
    public int Id { get; set; }
    public string? Name { get; set; } = string.Empty;
    public int Price { get; set; }
    public int Quantity { get; set; }
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
    public string ClientName { get; set; } = string.Empty;
    public bool Done { get; set; }
    public string PaymentMethod { get; set; }
    public string UserId { get; set; }
    public DateTime? DoneAt { get; set; }
}