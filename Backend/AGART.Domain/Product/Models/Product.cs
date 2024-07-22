using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using AGART.Domain.Common.Models;

namespace AGART.Domain.Product.Models;

public class Product : IEntity
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Material { get; set; }
    public string Description { get; set; }
    public string Dimensions { get; set; }
    public string LightSource { get; set; }
    public long Price { get; set; }
    public int PercentOff { get; set; } = 0;
    public string StripeId { get; set; }
    public string[] Keywords { get; set; }

    public bool Visible { get; set; }

    public int CategoryId { get; set; }

    public ICollection<Variant> Variants { get; set; }
    public Category.Models.Category Category { get; set; }
    [JsonIgnore]
    public List<OrderProduct.Models.OrderProduct> OrderProducts { get; set; }
}