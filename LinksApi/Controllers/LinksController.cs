using Microsoft.AspNetCore.Mvc;
using LinksApi.Data;
using LinksApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LinksApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LinksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LinksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("Controller funcionando");
        }


        //GET: api/links
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Link>>> GetLinks()
        {
            return await _context.Links.ToListAsync();
        }

        //GET: api/links/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Link>> GetLink(int id)
        {
            var link = await _context.Links.FindAsync(id);
            if (link == null)
            {
                return NotFound();
            }

            return link;
        }

        //POST: api/links
        [HttpPost]
        public async Task<ActionResult<Link>> CreateLink(Link link)
        {
            Console.WriteLine($"POST recebido: {link.Name} - {link.Url}");
            _context.Links.Add(link);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLink), new { id = link.Id }, link);
        }

        //PUT: api/links/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLink(int id, Link link)
        {
            if (id != link.Id)
            {
                return BadRequest();
            }

            _context.Entry(link).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //DELETE: api/link/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLink(int id)
        {
            var link = await _context.Links.FindAsync(id);

            if (link == null)
            {
                return NotFound();
            }

            _context.Links.Remove(link);
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}