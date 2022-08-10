using System;
using System.Collections.Generic;

namespace SkinData
{
    public partial class Skin
    {
        public string SkinId { get; set; } = null!;
        public string AccessGuid { get; set; } = null!;
        public string SkinUrl { get; set; } = null!;
        public string? SkinName { get; set; }
        public long Breed { get; set; }
        public long Pose { get; set; }
        public long Coverage { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LastViewed { get; set; }
    }
}
