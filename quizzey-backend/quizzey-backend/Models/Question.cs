namespace quizzey_backend.Models
{
	public class Question
	{

        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public string CorrectAnswer { get; set; } = string.Empty;
		public string WrongAnswer1 { get; set; } = string.Empty;
		public string WrongAnswer2 { get; set; } = string.Empty;
		public string WrongAnswer3 { get; set; } = string.Empty;
		public string WrongAnswer4 { get; set; } = string.Empty;
        public int QuizId { get; set; }
    }
}
