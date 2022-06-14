using Microsoft.EntityFrameworkCore;
using SoftBlue.Library.Database.Models;

namespace SoftBlue.Library.Database.Contexts;

public class Context : DbContext
{
    public DbSet<BookEntity> Books { get; set; }

    public DbSet<BookcaseEntity> Bookcases { get; set; }

    public Context(DbContextOptions options) : base(options)
    {

    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<BookEntity>().ToTable(nameof(Books));
        modelBuilder.Entity<BookcaseEntity>().ToTable(nameof(Bookcases));

        foreach (var entityType in modelBuilder.Model.GetEntityTypes()
                     .Where(e => typeof(DataEntity).IsAssignableFrom(e.ClrType)))
        {
            modelBuilder
                .Entity(entityType.ClrType)
                .Property(nameof(DataEntity.CreatedAt))
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("NOW()");
        }
    }
}