using AGART.Domain.Carousel.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.CarouselModule.Queries.GetCarouselItems;

public record GetCarouselQuery() : IRequest<ErrorOr<IEnumerable<CarouselItem>>>;



