using SkinData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

namespace maint
{
    public class Program
    {
        public static void Main()
        {
            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("maint.appsettings.Development.json")
                .AddJsonFile("maint.appsettings.json")
                .AddEnvironmentVariables()
                .Build();

            var options = new DbContextOptionsBuilder<VenToolsContext>()
                .UseNpgsql(config.GetConnectionString("ToolsDb"))
                .Options;

            var dbContext = new VenToolsContext(options);
            var weeks = config.GetValue<int>("AgeWeeks");
            var days = config.GetValue<int>("LastViewedDays");

            var createCheckDate = DateTime.UtcNow - new TimeSpan(7 * weeks, 0, 0, 0);
            var viewCheckDate = DateTime.UtcNow - new TimeSpan(days, 0, 0, 0);

            var oldSkins = dbContext.Skins.Where(x => x.DateCreated < createCheckDate && x.LastViewed < viewCheckDate);
            var count = oldSkins.Count();
            foreach (var skin in oldSkins)
            {
                if (File.Exists(skin.SkinUrl))
                    File.Delete(skin.SkinUrl);
            }
            dbContext.Skins.RemoveRange(oldSkins);
            dbContext.SaveChanges();

            Console.WriteLine($"{count} skins deleted");
        }
    }
}