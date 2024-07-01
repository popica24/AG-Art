using System.ComponentModel.DataAnnotations;
using AGART.Domain.Common.Models;
namespace AGART.Domain.Category.Models;

public class Category : IEntity
{
    [Key]
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public ICollection<Product.Models.Product>? Products { get; set; } = [];
}