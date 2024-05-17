using Microsoft.EntityFrameworkCore;
using Snowflakes.Models.Database;
using Snowflakes.Models.Request;

namespace Snowflakes.Repositories;

public class SnowflakeRepo(SnowflakeContext context)
{
    private const int PAGE_SIZE = 6;

    private readonly SnowflakeContext _context = context;

    public async Task<List<Snowflake>> GetPage(int pageNumber)
    {
        return await _context
            .Snowflakes.OrderByDescending(snowflake => snowflake.Id)
            .Skip((pageNumber - 1) * PAGE_SIZE)
            .Take(PAGE_SIZE)
            .ToListAsync();
    }

    public async Task<Snowflake> Add(CreateSnowflakeRequest createSnowflakeRequest)
    {
        var newSnowflake = await _context.Snowflakes.AddAsync(
            new Snowflake { Points = createSnowflakeRequest.Points, }
        );
        await _context.SaveChangesAsync();
        return newSnowflake.Entity;
    }
}
