using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.SwaggerUI;
using LinksApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

builder.Services.AddOpenApi(); 

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Links API v1");
    });
}

app.MapControllers();
app.Run();
