using Microsoft.EntityFrameworkCore;
using quizzey_backend;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

builder.Services.AddCors(options => options.AddPolicy("Cors", builder =>
{
	builder.AllowAnyOrigin()
	.AllowAnyMethod()
	.AllowAnyHeader();
}));

builder.Services.AddDbContext<QuizContext>(options =>
{
	options.UseInMemoryDatabase("quiz");
});

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

app.UseAuthorization();

app.UseCors("Cors");

app.MapRazorPages();
app.MapDefaultControllerRoute();

app.Run();
