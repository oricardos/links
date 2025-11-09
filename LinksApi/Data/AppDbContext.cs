using Microsoft.EntityFrameworkCore;
using LinksApi.Models;

namespace LinksApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Link>Links { get; set; }
    }
}