using Microsoft.EntityFrameworkCore;
using quizzey_backend.Models;

namespace quizzey_backend
{
	public class QuizContext : DbContext
	{

		public QuizContext(DbContextOptions<QuizContext> options) : base(options) { }

        public DbSet<Question> Questions { get; set; }

        public DbSet<quizzey_backend.Models.Quiz>? Quiz { get; set; }

    }
}
