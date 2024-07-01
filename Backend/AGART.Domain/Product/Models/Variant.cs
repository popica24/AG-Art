using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using AGART.Domain.Common.Models;

namespace AGART.Domain.Product.Models;

public class Variant : IEntity
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string ColorCode { get; set; }

    public int ProductId { get; set; }

    [JsonIgnore]
    public Product Product { get; set; }
}