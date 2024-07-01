
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Presentation.API.Common.Mappings;
using AGART.Services.Persistance;
using Asp.Versioning;

namespace AGART.Presentation.API.Configuration;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddRouting(options => options.LowercaseUrls = true);
        services.AddApiVersioning(options =>
      {
          options.DefaultApiVersion = new ApiVersion(1);
          options.ReportApiVersions = true;
          options.AssumeDefaultVersionWhenUnspecified = true;
          options.ApiVersionReader = ApiVersionReader.Combine(
            new UrlSegmentApiVersionReader(),
            new HeaderApiVersionReader("X-Api-Version"));
      }).AddApiExplorer(options =>
      {
          options.GroupNameFormat = "'v'V";
          options.SubstituteApiVersionInUrl = true;
      });

        services.AddMappings();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        return services;
    }
}