using backend.Utils;
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
        public ActionResult GetScene(int id, bool fullImage = false)
        {
            string filepath = "";
            if (fullImage)
            {
                filepath = $"{_config.GetValue<string>("SceneStore")}/{id}_full.png";
            }
            else
                filepath = $"{_config.GetValue<string>("SceneStore")}/{id}.png";

            try
            {
                Byte[] b = System.IO.File.ReadAllBytes(filepath);
                Response.StatusCode = (int)HttpResponseCode.OK;
                return File(b, "image/png");
            }
            catch
            {
                Response.StatusCode = (int)HttpResponseCode.NotFound;
                return new JsonResult(new { success = false, message = "Failed to retrieve scene image" });
            }
        }

        [HttpGet("base/{id}")]
        public ActionResult GetBase(string id)
        {
            var filePath = $"{_config.GetValue<string>("BaseStore")}/{id}.png";
            if (System.IO.File.Exists(filePath)) 
            { 
                Byte[] b = System.IO.File.ReadAllBytes(filePath);
                Response.StatusCode = (int)HttpResponseCode.OK;
                return File(b, "image/png");
            }
            else
            {
                if (!System.IO.Directory.Exists($"{_config.GetValue<string>("BaseStore")}"))
                {
                    Response.StatusCode = (int)HttpResponseCode.NotFound;

                    return new JsonResult(new { success = false, message = $"Directory missing - {filePath}" });
                }
                Response.StatusCode = (int)HttpResponseCode.NotFound;
                return new JsonResult(new { success = false, message = $"Failed to retrieve base image from {filePath}" });
            }
        }
      
    }
}
