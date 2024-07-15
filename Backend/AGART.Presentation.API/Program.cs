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

const string APP_DOMAIN = "http://localhost:5173";
const string ADMIN_DOMAIN = "http://localhost:5174";

var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();

StripeConfiguration.ApiKey = "sk_test_51PGTp8B68kIb1rZLBU6Qw5g5kWDH1czC51pqPPJSW1kNGBQNzygQNHfh3oHSSQwdRtwyKKik8v0UF0XL79SN8UzO00Wevko7TQ";

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
        opt.Authority = "https://securetoken.google.com/agart-dev";
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "https://securetoken.google.com/agart-dev",
            ValidAudience = "agart-dev"
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

    app.MapHealthChecks("/health");

    app.UseSerilogRequestLogging();

    app.UseHttpsRedirection();

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