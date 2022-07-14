using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Mumrich.SpaDevMiddleware.Contracts;

using Vue.PiniaTools.Host;

var builder = WebApplication.CreateBuilder(args);
//var appHostSettings = builder.Configuration.Get<AppHostSettings>();

// AppSettings & variants
//builder.Services.AddSingleton(appHostSettings);
//builder.Services.AddSingleton<ISpaDevServerSettings>(appHostSettings);

builder.Services.AddControllersWithViews();
builder.Services.AddCors();

var reverseProxyConfig = builder.Configuration.GetSection("ReverseProxy");
// builder.RegisterSinglePageAppDevMiddleware(appHostSettings);
builder.Services.AddReverseProxy().LoadFromConfig(reverseProxyConfig);

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.MapControllers();
// app.MapSinglePageApps(appHostSettings);
app.MapReverseProxy();

app.Run();
