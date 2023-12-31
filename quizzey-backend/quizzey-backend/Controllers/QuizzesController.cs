﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quizzey_backend.Models;

namespace quizzey_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizzesController : ControllerBase
    {
        private readonly QuizContext _context;

        public QuizzesController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/Quizzes
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuiz()
        {
            var userId = HttpContext.User.Claims.First().Value;

            if (_context.Quiz == null)
            {
                return NotFound();
            }

            return await _context.Quiz.Where(q => q.OwnerId == userId).ToListAsync();
        }

        // GET: api/Quizzes
		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Quiz>>> GetAllQuizzes()
		{
			if (_context.Quiz == null)
			{
                return new List<Quiz>();
			}

			return await _context.Quiz.ToListAsync();
		}

		// GET: api/Quizzes/5
		[HttpGet("{id}")]
        public async Task<ActionResult<Quiz>> GetQuiz(int id)
        {
          if (_context.Quiz == null)
          {
              return NotFound();
          }
            var quiz = await _context.Quiz.FindAsync(id);

            if (quiz == null)
            {
                return NotFound();
            }

            return quiz;
        }

        // PUT: api/Quizzes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuiz(int id, Quiz quiz)
        {
            if (id != quiz.Id)
            {
                return BadRequest();
            }

            _context.Entry(quiz).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Quizzes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Quiz>> PostQuiz(Quiz quiz)
        {
          if (_context.Quiz == null)
          {
              return Problem("Entity set 'QuizContext.Quiz'  is null.");
          }

            string userId = HttpContext.User.Claims.First().Value;

            quiz.OwnerId = userId;

            _context.Quiz.Add(quiz);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuiz", new { id = quiz.Id }, quiz);
        }

        // DELETE: api/Quizzes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz(int id)
        {
            if (_context.Quiz == null)
            {
                return NotFound();
            }
            var quiz = await _context.Quiz.FindAsync(id);
            if (quiz == null)
            {
                return NotFound();
            }

            _context.Quiz.Remove(quiz);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuizExists(int id)
        {
            return (_context.Quiz?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
