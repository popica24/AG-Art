using AGART.Domain.Carousel.Models;
using AGART.Domain.Category.Models;
using AGART.Services.Persistance.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AGART.Services.Configuration
{
    public static class DataSeed
    {
        public static void SeedDatabase(this IServiceProvider serviceProvider)
        {
            using var context = new AppDbContext(serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());
            InitializeCarousel(context);
            InitializeCategories(context);
        }

        private static void InitializeCarousel(AppDbContext context)
        {

            if (context == null || context.CarouselItem == null)
            {
                return;
            }
            if (context.CarouselItem.Any())
            {
                return;
            }
            var carouselItems = new List<CarouselItem>();
            for (int i = 1; i <= 5; i++)
            {
                var item = new CarouselItem { Id = i, Name = $"Item {i}" };
                carouselItems.Add(item);
            }
            context.CarouselItem.AddRange(carouselItems);
            context.SaveChanges();
        }

        private static void InitializeCategories(AppDbContext context)
        {
            if (context == null || context.Category == null)
            {
                return;
            }
            if (context.Category.Any())
            {
                return;
            }
            var categories = new List<Category>
            {
                new() {Id = "pendule"},
                new() {Id = "lampadare-de-podea"},
                new() {Id = "lampi-de-masa"},
                new() {Id = "abajururi-din-lemn"},
                new() {Id = "aplice-de-perete"},
                new() {Id = "becuri"},
                new() {Id = "tablouri-din-lemn"},
                new() {Id = "articole-sezoniere"},
            };
            context.Category.AddRange(categories);
            context.SaveChanges();
        }
    }
}