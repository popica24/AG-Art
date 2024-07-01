using System.ComponentModel.DataAnnotations;
namespace AGART.Domain.Category.Models;

public class Category
{
    [Key]
    public string Id { get; set; }
    public ICollection<Product.Models.Product>? Products { get; set; } = [];
}