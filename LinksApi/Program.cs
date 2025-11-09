using Microsoft.AspNetCore.OpenApi; // novo namespace para AddOpenApi
using Swashbuckle.AspNetCore.SwaggerUI; // garante acesso ao UseSwaggerUI

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi(); // novo registro do .NET 10

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // Novo endpoint OpenAPI (gera /openapi/v1.json)
    app.MapOpenApi();

    // UI clássica do Swagger (usando pacote separado)
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Links API v1");
    });
}

app.MapControllers();
app.Run();
