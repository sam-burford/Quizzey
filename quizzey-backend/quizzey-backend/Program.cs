using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using quizzey_backend;
using System.Text;

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

builder.Services.AddDbContext<UserDbContext>(options =>
{
	options.UseInMemoryDatabase("user");
});

builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<UserDbContext>();

var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));

builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(cfg =>
{
	cfg.RequireHttpsMetadata = false;
	cfg.SaveToken = true;
	cfg.TokenValidationParameters = new TokenValidationParameters()
	{
		IssuerSigningKey = signingKey,
		ValidateAudience = false,
		ValidateIssuer = false,
		ValidateLifetime = false,
		ValidateIssuerSigningKey = true
	};
});

var app = builder.Build();

app.UseAuthentication();

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
