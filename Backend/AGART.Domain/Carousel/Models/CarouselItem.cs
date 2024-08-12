using System.ComponentModel.DataAnnotations;
using AGART.Domain.Common.Models;

namespace AGART.Domain.Carousel.Models;

public class CarouselItem : IEntity
{
    [Key]
    public int Id { get; set; }
    public string? Name { get; set; } = string.Empty;
    public int ProductId { get; set; }
}