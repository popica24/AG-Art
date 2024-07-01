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
    public string City { get; set; } = string.Empty;
    public string AddressLine1 { get; set; } = string.Empty;
    public string AddressLine2 { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public bool Done { get; set; }
    public DateTime? DoneAt { get; set; }
}