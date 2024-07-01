using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Carousel.Models;
using AGART.Domain.Common.Errors;
using ErrorOr;
using MediatR;

namespace AGART.Application.CarouselModule.Queries.GetCarouselItems
{
    public class GetCarouselQueryHandler(IUnitOfWork uow) : IRequestHandler<GetCarouselQuery, ErrorOr<IEnumerable<CarouselItem>>>
    {
        public async Task<ErrorOr<IEnumerable<CarouselItem>>> Handle(GetCarouselQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var result = uow.Carousel.Get().OrderBy(item => item.Id).ToList();

                return result;

            }
            catch (Exception ex)
            {
                return Errors.General.Internal(ex.Message);
            }

        }
    }
}