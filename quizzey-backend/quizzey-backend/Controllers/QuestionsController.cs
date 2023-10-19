using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quizzey_backend.Models;

namespace quizzey_backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class QuestionsController : ControllerBase
	{

		private readonly QuizContext context;

		public QuestionsController(QuizContext context)
		{
			this.context = context;
		}

		[HttpGet]
		public IEnumerable<Question> Get()
		{
			return context.Questions;
		}

		[HttpGet("{quizId}")]
		public IEnumerable<Question> Get([FromRoute] int quizId)
		{
			return context.Questions.Where(q => q.QuizId == quizId);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] Question question)
		{
			var quiz = context.Quiz.SingleOrDefault(q => q.Id == question.QuizId);

			if (quiz == null)
			{
				return NotFound();
			}

			context.Questions.Add(question);
			await context.SaveChangesAsync();
			return Ok(question);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id, [FromBody] Question question)
		{
			if (id != question.Id)
			{
				return BadRequest("Question ID does not match the URL parameter");
			}

			context.Entry(question).State = EntityState.Modified;

			await context.SaveChangesAsync();

			return Ok(question);
		}

	}
}
