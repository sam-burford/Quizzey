using Microsoft.AspNetCore.Mvc;
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

		[HttpPost]
		public void Post([FromBody] Question question)
		{
			context.Questions.Add(question);
			context.SaveChanges();
		}

		[HttpPut("{id}")]
		public void Put(int id, [FromBody] Question question)
		{

		}

	}
}
