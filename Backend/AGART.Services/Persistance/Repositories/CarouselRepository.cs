using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Carousel.Models;
using AGART.Services.Persistance.Context;

namespace AGART.Services.Persistance.Repositories
{
    public class CarouselRepository(AppDbContext context) : GenericRepository<CarouselItem>(context), ICarouselRepository
    {

    }
}