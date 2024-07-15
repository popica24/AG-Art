namespace AGART.Application.Common.Interfaces.Persistance;

public interface IUnitOfWork : IDisposable
{
    public IProductRepository Products { get; }

    public ICarouselRepository Carousel { get; }

    public IVariantRepository Variant { get; }

    public ICategoryRepository Category { get; }

    public IOrderRepository Order { get; }

    public Task SaveChangesAsync(CancellationToken cancellationToken);

}