using Microsoft.EntityFrameworkCore;
using Snowflakes.Models.Database;

namespace Snowflakes;

public class SnowflakeContext(DbContextOptions<SnowflakeContext> options) : DbContext(options)
{
    public DbSet<Snowflake> Snowflakes { get; set; } = null!;
}
