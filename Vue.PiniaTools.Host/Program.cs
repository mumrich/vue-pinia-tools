using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Mumrich.SpaDevMiddleware.Contracts;
using Mumrich.SpaDevMiddleware.Extensions;

using Vue.PiniaTools.Host;

var builder = WebApplication.CreateBuilder(args);
var appHostSettings = builder.Configuration.Get<AppHostSettings>();

// AppSettings & variants
builder.Services.AddSingleton(appHostSettings);
builder.Services.AddSingleton<ISpaDevServerSettings>(appHostSettings);

// services
builder.Services.AddControllersWithViews();
builder.Services.AddCors();

// SPA middleware
builder.RegisterSinglePageAppDevMiddleware(appHostSettings);

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.MapControllers();

// SPA apps
app.MapSinglePageApps(appHostSettings);

app.Run();
