using AGART.Domain.Carousel.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.CarouselModule.Commands.Update;
public record UpdateCarouselCommand(int id, CarouselItem item) : IRequest<ErrorOr<CarouselItem>>;

