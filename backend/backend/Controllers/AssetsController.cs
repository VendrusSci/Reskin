using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AssetsController(IConfiguration config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        [HttpGet("scene/{id}")]
        public ActionResult GetScene(int id)
        {
            try
            {
                Byte[] b = System.IO.File.ReadAllBytes($"{_config.GetValue<string>("SceneStore")}/{id}.png");
                return File(b, "image/png");
            }
            catch
            {
                return new JsonResult(new { success = false, message = "Failed to retrieve scene image" });
            }
        }

        [HttpGet("base/{id}")]
        public ActionResult GetBase(string id)
        {
            try
            {
                Byte[] b = System.IO.File.ReadAllBytes($"{_config.GetValue<string>("BaseStore")}/{id}.png");
                return File(b, "image/png");
            }
            catch
            {
                return new JsonResult(new { success = false, message = "Failed to retrieve base image" });
            }
        }
      
    }
}
