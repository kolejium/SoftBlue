using System.Reflection;
using AutoMapper;
using FluentValidation.AspNetCore;
using Flurl.Http.Configuration;
using Hellang.Middleware.ProblemDetails;
using Hellang.Middleware.ProblemDetails.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoftBlue.Common.Helpers;
using SoftBlue.Library.Database.Contexts;
using SoftBlue.Library.Features.Book.Interfaces;
using SoftBlue.Library.Features.Book.Services;
using SoftBlue.Library.Features.Bookcase.Interfaces;
using SoftBlue.Library.Features.Bookcase.Services;
using SoftBlue.Library.Filters;
using SoftBlue.Library.Infrastructure;

var defaultCors = "default";

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddConfigurationFiles();

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: defaultCors,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var section = builder.Configuration.GetSection($"{nameof(ApiSettings)}:{nameof(StorageSettings)}");

builder.Services.Configure<StorageSettings>(builder.Configuration.GetSection($"{nameof(ApiSettings)}:{nameof(StorageSettings)}"));

builder.Services.AddControllers().AddProblemDetailsConventions().AddFluentValidation().Services
    .Configure<MvcOptions>(options => options.Filters.Add<OperationResultFilter>(0));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddProblemDetails(options => { options.IncludeExceptionDetails = (_, _) => false; });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGenNewtonsoftSupport();
builder.Services.AddSwaggerGen(options =>
{
    options.DocumentFilter<EnumDocumentFilter>();
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory,
        $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
});


builder.Services.AddSingleton<IMapper>(
    new Mapper(new MapperConfiguration(expression => expression.AddProfile(new MapperProfile()))));

builder.Services.AddDbContext<Context>(optionsBuilder =>
    {
        optionsBuilder.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSql"),
            contextOptionsBuilder => { contextOptionsBuilder.MigrationsAssembly("SoftBlue.Migrations.PostgreSql"); }
        );
    }
);

builder.Services.AddTransient<IBookService, BookService>();
builder.Services.AddTransient<IBookcaseService, BookcaseService>();
builder.Services.AddTransient<IFlurlClientFactory, PerBaseUrlFlurlClientFactory>();

var app = builder.Build();

await using (var serviceScope = app.Services.CreateAsyncScope())
{
    var services = serviceScope.ServiceProvider;
    var context = services.GetService<Context>();

    await context.Database.MigrateAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors(defaultCors);

app.UseAuthorization();

app.MapControllers();

app.Run();