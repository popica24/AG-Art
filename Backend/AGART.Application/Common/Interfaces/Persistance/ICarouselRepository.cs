using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AGART.Domain.Carousel.Models;

namespace AGART.Application.Common.Interfaces.Persistance
{
    public interface ICarouselRepository : IGenericRepository<CarouselItem>
    {

    }
}