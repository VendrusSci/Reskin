using backend.Models;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;

namespace backend.Controllers
{
    [ApiController]
    [Route("/api/skin")]
    public class SkinController : Controller
    {
        private readonly VenToolsContext _context;
        private readonly IConfiguration _config;
        private readonly int _accentCutoff = 31;

        public SkinController(VenToolsContext context, IConfiguration config)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        [HttpGet("{skinId}")]
        public ActionResult GetSkin(string skinId)
        {
            var skin = _context.Skins.FirstOrDefault(x => x.SkinId == skinId);
            if (skin == null)
            {
                Response.StatusCode = (int)HttpResponseCode.NotFound;
                return new JsonResult(new { success = false, message = "Skin with this ID does not exist or has been deleted" });
            }
            else
            {
                var skinType = skin.Coverage / 100 > _accentCutoff ? "Skin" : "Accent";
                Response.StatusCode = (int)HttpResponseCode.OK;
                return new JsonResult(new { success = true, skin.SkinName, currentBreed = skin.Breed, currentPose = skin.Pose, skinType = skinType }) ;
            }
        }

        [HttpGet("{skinId}/image")]
        public ActionResult GetSkinImage(string skinId)
        {
            try
            {
                var skin = _context.Skins.FirstOrDefault(x => x.SkinId == skinId);
                if (skin == null)
                {
                    Response.StatusCode = (int)HttpResponseCode.NotFound;
                    return new JsonResult(new { success = false, message = "Skin with this ID does not exist or has been deleted" });
                }
                else
                {
                    Byte[] b = System.IO.File.ReadAllBytes(skin.SkinUrl);
                    Response.StatusCode = (int)HttpResponseCode.OK;
                    return File(b, "image/png");
                }
            }
            catch
            {
                Response.StatusCode = (int)HttpResponseCode.ServerError;
                return new JsonResult(new { success = false, message = "Skin id found but failed to retrieve skin image" });
            }
        }

        [HttpGet("{skinId}/{accessGuid}")]
        public ActionResult GetAuth(string skinId, string accessGuid)
        {
            var skin = _context.Skins.FirstOrDefault(x => x.SkinId == skinId);
            if (skin == null)
            {
                Response.StatusCode = (int)HttpResponseCode.NotFound;
                return new JsonResult(new { success = false, message = "Skin with this ID does not exist or has been deleted" });
            }
            else if(skin.AccessGuid != accessGuid)
            {
                Response.StatusCode = (int)HttpResponseCode.Unauthorized;
                return new JsonResult( new { success = false, message = "You do not have a valid access code for this skin" });
            }
                
            else
            {
                Response.StatusCode = (int)HttpResponseCode.OK;
                return new JsonResult(new { success = true});
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromForm] IFormFile skinFile, [FromForm] string skinName, [FromForm] int breed, [FromForm] int pose, [FromForm] decimal coverage)
        {
            string filePath = string.Empty;
            string accessGuid = Guid.NewGuid().ToString();
            string skinId = accessGuid.Substring(0, 8);

            if (skinFile.Length > 0)
            {
                if(skinFile.Length > 300000)
                {
                    Response.StatusCode = (int)HttpResponseCode.NotAcceptable;
                    return new JsonResult(new { success = false, message = "Skin file size over maximum permitted." });
                }
                else
                {
                    using(var image = Image.Load(skinFile.OpenReadStream()))
                    {
                        if(image.Height != 350 || image.Width != 350)
                        {
                            Response.StatusCode = (int)HttpResponseCode.NotAcceptable;
                            return new JsonResult(new { success = false, message = "Skin image must be 350 x 350px." });
                        }
                    }
                }

                var filename = accessGuid + ".png";
                filePath = Path.Combine(_config.GetValue<string>("ImageStore"), filename);

                Directory.CreateDirectory(_config.GetValue<string>("ImageStore"));

                Stream fileStream = new FileStream(filePath, FileMode.Create);
                await skinFile.CopyToAsync(fileStream);
                fileStream.Close();
            }

            _context.Skins.Add(new Skin
            {
                SkinId = skinId,
                AccessGuid = accessGuid,
                SkinUrl = filePath,
                SkinName = skinName,
                Breed = breed,
                Pose = pose,
                Coverage = (int)(coverage * 100),
                DateCreated = DateTime.UtcNow,
                LastViewed = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();

            Response.StatusCode = (int)HttpResponseCode.Created;
            return new JsonResult(new {success = true, skinId, accessGuid});
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] string skinId, [FromForm] string accessGuid, [FromForm] IFormFile skinFile, [FromForm] string skinName, [FromForm] int breed, [FromForm] int pose, [FromForm] decimal coverage)
        {
            var skin = _context.Skins.FirstOrDefault(x => x.SkinId == skinId);
            if (skin == null)
                return new JsonResult(new { success = false, message = "Skin with this ID does not exist or has been deleted" });
            else if (skin.AccessGuid != accessGuid)
                return new JsonResult(new { success = false, message = "You do not have a valid access code for this skin" });
            else
            {
                if (skinFile.Length > 0)
                {
                    if (skinFile.Length > 300000)
                    {
                        Response.StatusCode = (int)HttpResponseCode.NotAcceptable;
                        return new JsonResult(new { success = false, message = "Skin file size over maximum permitted." });
                    }
                    else
                    {
                        using (var image = Image.Load(skinFile.OpenReadStream()))
                        {
                            if (image.Height != 350 || image.Width != 350)
                            {
                                Response.StatusCode = (int)HttpResponseCode.NotAcceptable;
                                return new JsonResult(new { success = false, message = "Skin image must be 350 x 350px." });
                            }
                        }
                    }

                    Stream fileStream = new FileStream(skin.SkinUrl, FileMode.Open);
                    await skinFile.CopyToAsync(fileStream);
                    fileStream.Close();
                }

                skin.SkinName = skinName;
                skin.Breed = breed;
                skin.Pose = pose;
                skin.Coverage = (int)(coverage * 100);
                skin.LastViewed = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }

            Response.StatusCode = (int)HttpResponseCode.OK;
            return new JsonResult(new { success = true });
        }

        [HttpDelete]
        public ActionResult Delete(string skinId, string accessGuid)
        {
            var skin = _context.Skins.FirstOrDefault(x => x.SkinId == skinId);
            if (skin == null)
            {
                Response.StatusCode = (int)HttpResponseCode.NotFound;
                return new JsonResult(new { success = false, message = "Skin with this ID does not exist or has been deleted" });
            }
            else if (skin.AccessGuid != accessGuid)
            {
                Response.StatusCode = (int)HttpResponseCode.Unauthorized;
                return new JsonResult(new { success = false, message = "You do not have a valid access code for this skin" });
            }
            else
            {
                if(System.IO.File.Exists(skin.SkinUrl))
                    System.IO.File.Delete(skin.SkinUrl);
                _context.Skins.Remove(skin);
                _context.SaveChanges();
                Response.StatusCode = (int)HttpResponseCode.Deleted;
                return new JsonResult(new { success = true });
            }
        }
    }
}
