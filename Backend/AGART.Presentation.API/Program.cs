using AGART.Services.Configuration;
using Serilog;
using AGART.Application.Common.Utilities;
using AGART.Presentation.API.Configuration;
using AGART.Application.Configuration;
using AGART.Presentation.API.BackgroundServices;
using Stripe;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.HttpOverrides;

string APP_DOMAIN = Environment.GetEnvironmentVariable("APP_DOMAIN")!;
string ADMIN_DOMAIN = Environment.GetEnvironmentVariable("ADMIN_DOMAIN")!;

var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();

StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("STRIPE_SK");

try
{
    Log.Information("{ApplicationName} is starting up.", GlobalConstants.ApplicationName);
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog();
    builder.Services.AddHostedService<RefreshRecommanded>();
    builder.Services.AddHostedService<RefreshLatestAdded>();
    builder.Services.AddAuthorization();
    builder.Services
        .AddApplication()
        .AddPresentation()
        .AddServices(builder.Configuration);

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("User", builder =>
        {
            builder.WithOrigins(APP_DOMAIN)
            .WithMethods("GET")
            .AllowAnyHeader();
        });
        options.AddPolicy("Admin", builder =>
        {
            builder.WithOrigins(ADMIN_DOMAIN, APP_DOMAIN)
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
        options.AddPolicy("AdminOnly", builder =>
        {
            builder.WithOrigins(ADMIN_DOMAIN)
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
    });

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.Authority = Environment.GetEnvironmentVariable("JWT_VALID_ISSUER");
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Environment.GetEnvironmentVariable("JWT_VALID_ISSUER"),
            ValidAudience = Environment.GetEnvironmentVariable("JWT_VALID_AUDIENCE")
        };
    });

    FirebaseApp.Create(new AppOptions()
    {
        Credential = GoogleCredential.FromFile("agart-dev-firebase-adminsdk-skdlb-03bffeea89.json")
    });

    var app = builder.Build();

    using (var scope = app.Services.CreateScope())
    {
        var serviceProvider = scope.ServiceProvider;
        serviceProvider.SeedDatabase();
    }

    app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
    });

    app.MapHealthChecks("/health");

    app.UseSerilogRequestLogging();

    //app.UseHttpsRedirection();

    app.UseCors();

    app.UseAuthentication();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "{ApplicationName} failed to start up.", GlobalConstants.ApplicationName);
}
finally
{
    Log.CloseAndFlush();
}
