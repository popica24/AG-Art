using AGART.Application.ProductModule.Queries.GetRecommended;
using MediatR;

namespace AGART.Presentation.API.BackgroundServices;

public class RefreshRecommanded(IServiceScopeFactory serviceScopeFactory) : IHostedService, IDisposable
{
    private Timer? _timer = null;
    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }
    private async void DoWork(object? state)
    {

        using var scope = serviceScopeFactory.CreateScope();
        var sender = scope.ServiceProvider.GetRequiredService<ISender>();

        var result = await sender.Send(new GetRecommendedQuery());
    }
}
