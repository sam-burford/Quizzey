using Microsoft.AspNetCore.Mvc;

namespace quizzey_backend.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
