using AGART.Application.Common.Interfaces.Persistance;
using AGART.Services.Persistance.Context;
using AGART.Services.Persistance.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AGART.Services.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
            services.AddTransient<ICacheRepository, CacheRepository>();
            services.AddHealthChecks();
            return services;
        }
    }
}
