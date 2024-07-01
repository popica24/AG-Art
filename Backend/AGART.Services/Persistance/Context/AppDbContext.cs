using AGART.Domain.Carousel.Models;
using AGART.Domain.Category.Models;
using AGART.Domain.Order.Models;
using AGART.Domain.Product.Models;
using Microsoft.EntityFrameworkCore;

namespace AGART.Services.Persistance.Context
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Product> Product { get; set; }
        public DbSet<Variant> Variant { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<CarouselItem> CarouselItem { get; set; }
        public DbSet<Order> Order { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Variant>()
                .HasOne(v => v.Product)
                .WithMany(p => p.Variants)
                .HasForeignKey(v => v.ProductId);
        }
    }
}
