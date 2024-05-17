using Microsoft.AspNetCore.Mvc;
using Snowflakes.Models.Request;
using Snowflakes.Models.Response;
using Snowflakes.Repositories;

namespace Snowflakes.Controllers;

[ApiController]
[Route("/snowflakes")]
public class SnowflakeController(SnowflakeRepo snowflakeRepo) : Controller
{
    private readonly SnowflakeRepo _snowflakeRepo = snowflakeRepo;

    [HttpGet("")]
    public async Task<IActionResult> GetPage([FromQuery] int pageNumber = 1)
    {
        var snowflakes = await _snowflakeRepo.GetPage(pageNumber);
        return Ok(
            new SnowflakesResponse
            {
                Snowflakes = snowflakes
                    .Select(snowflake => new SnowflakeResponse { Id = snowflake.Id, Points = snowflake.Points, })
                    .ToList(),
            }
        );
    }

    [HttpPost("")]
    public async Task<IActionResult> Add([FromBody] CreateSnowflakeRequest createSnowflakeRequest)
    {
        var newSnowflake = await _snowflakeRepo.Add(createSnowflakeRequest);
        return Ok(new SnowflakeResponse { Id = newSnowflake.Id, Points = newSnowflake.Points, });
    }
}
