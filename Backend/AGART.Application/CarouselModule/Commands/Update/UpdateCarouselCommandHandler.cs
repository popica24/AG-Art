using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Carousel.Models;
using AGART.Domain.Common.Errors;
using ErrorOr;
using MediatR;

namespace AGART.Application.CarouselModule.Commands.Update;

public class UpdateCarouselCommandHandler(IUnitOfWork uow) : IRequestHandler<UpdateCarouselCommand, ErrorOr<CarouselItem>>
{
    public async Task<ErrorOr<CarouselItem>> Handle(UpdateCarouselCommand request, CancellationToken cancellationToken)
    {
        try
        {

            var result = await uow.Carousel.UpdateAsync(request.id, request.item);

            await uow.SaveChangesAsync(cancellationToken);

            return result;

        }
        catch (Exception ex)
        {
            return Errors.General.Internal(ex.Message);
        }
    }
}
