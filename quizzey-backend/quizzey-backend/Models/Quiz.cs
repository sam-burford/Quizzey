namespace quizzey_backend.Models
{
	public class Quiz
	{

        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? OwnerId { get; set; }

    }
}
