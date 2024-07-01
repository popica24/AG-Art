using System.ComponentModel.DataAnnotations;
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

    public string CategoryId { get; set; }

    public ICollection<Variant> Variants { get; set; }
    public Category.Models.Category Category { get; set; }
}