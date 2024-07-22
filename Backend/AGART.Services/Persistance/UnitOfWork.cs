using AGART.Application.Common.Interfaces.Persistance;
using AGART.Services.Persistance.Context;
using AGART.Services.Persistance.Repositories;

namespace AGART.Services.Persistance;

public class UnitOfWork : IUnitOfWork
{
    private bool _disposed;
    public IProductRepository Products { get; private set; }
    public ICarouselRepository Carousel { get; private set; }
    public IVariantRepository Variant { get; private set; }
    public ICategoryRepository Category { get; private set; }
    public IOrderRepository Order { get; private set; }
    public IOrderProduct OrderProduct { get; private set; }

    public AppDbContext _context { get; set; }

    public ICacheRepository _cache { get; set; }


    public UnitOfWork(AppDbContext context, ICacheRepository cache)
    {
        _context = context;
        _cache = cache;
        Init();
    }

    private void Init()
    {
        Products = new ProductRepository(_context, _cache);
        Carousel = new CarouselRepository(_context);
        Variant = new VariantRepository(_context);
        Category = new CategoryRepository(_context);
        Order = new OrderRepository(_context);
        OrderProduct = new OrderProductRepository(_context);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {

            if (disposing)
            {
                _context.Dispose();

            }

            _disposed = true;
        }

    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _context.SaveChangesAsync(cancellationToken);
    }
}