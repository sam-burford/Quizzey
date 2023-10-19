using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace quizzey_backend.Controllers
{

	public class Credentials
	{
        public string Email { get; set; }
        public string Password { get; set; }
    }

	[Route("api/[controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{

		private readonly UserManager<IdentityUser> userManager;
		private readonly SignInManager<IdentityUser> signInManager;

		public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
		{
			this.userManager = userManager;
			this.signInManager = signInManager;
		}

		[HttpPost]
		public async Task<IActionResult> Register([FromBody] Credentials credentials)
		{
			var user = new IdentityUser
			{
				UserName = credentials.Email,
				Email = credentials.Email
			};

			var result = await userManager.CreateAsync(user, credentials.Password);

			if (result.Succeeded == false)
				return BadRequest(result.Errors);

			await signInManager.SignInAsync(user, isPersistent: false);

			return Ok(CreateToken(user));
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] Credentials credentials)
		{
			var result = await signInManager.PasswordSignInAsync(
				credentials.Email, credentials.Password, false, false
			);

			if (result.Succeeded == false)
				return BadRequest();

			var user = await userManager.FindByEmailAsync(credentials.Email);

			return Ok(CreateToken(user));
		}

		private object CreateToken(IdentityUser user)
		{
			var claims = new Claim[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.Id)
			};

			var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
			var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
			var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);

			var response = new
			{
				Token = new JwtSecurityTokenHandler().WriteToken(jwt)
			};

			return response;
		}

	}

}
