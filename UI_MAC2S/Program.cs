using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Web;

using MudBlazor.Services;
using Radzen;
using System.IdentityModel.Tokens.Jwt;
using UI_MAC2S.Contracts;
using UI_MAC2S.Provider;
using UI_MAC2S.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddMudServices();
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddAuthorizationCore();
builder.Services.AddBlazoredLocalStorage();

builder.Services.AddScoped<DialogService>();
builder.Services.AddScoped<NotificationService>();
builder.Services.AddScoped<TooltipService>();
builder.Services.AddScoped<ContextMenuService>();
//builder.Services.AddFileReaderService();
builder.Services.AddScoped<ApiAuthenticationStateProvider>();
builder.Services.AddScoped<AuthenticationStateProvider>(p => p.GetRequiredService<ApiAuthenticationStateProvider>());
builder.Services.AddScoped<JwtSecurityTokenHandler>();
builder.Services.AddHttpClient();

builder.Services.AddTransient<IStatusDurationRepository, StatusDurationRepository>();
builder.Services.AddTransient<IStatusRepository, StatusRepository>();

builder.Services.AddTransient<IStatusGroupDurationRepository, StatusGroupDurationRepository>();
builder.Services.AddTransient<ISensorUniqueRepository, SensorUniqueRepository>();
builder.Services.AddTransient<ISensorPlRepository, SensorPlRepository>();

builder.Services.AddTransient<IMachineRepository, MachineRepository>();
builder.Services.AddTransient<IDbSelectRepository, DbSelectRepository>();

builder.Services.AddTransient<ISensorGlobalRepository, SensorGlobalRepository>();
builder.Services.AddTransient<IAuthenticationRepository, AuthenticationRepository>();

builder.Services.AddTransient<IActivityReportRepository, ActivityReportRepository>();
builder.Services.AddTransient<ILogDurationRepository, LogDurationRepository>();
builder.Services.AddTransient<IImageRepository, ImageRepository>();

builder.Services.AddTransient<IGaugeParameterRepository, GaugeParameterRepository>();
builder.Services.AddTransient<IScheduleParameterRepository, ScheduleParameterRepository>();

builder.Services.AddTransient<ILogService, LogService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
