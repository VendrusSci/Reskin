using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace backend.Models
{
    public partial class VenToolsContext : DbContext
    {
        public VenToolsContext()
        {
        }

        public VenToolsContext(DbContextOptions<VenToolsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Skin> Skins { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Skin>(entity =>
            {
                entity.ToTable("Skin");

                entity.Property(e => e.SkinId).HasColumnType("text");

                entity.Property(e => e.AccessGuid).HasColumnType("text");

                entity.Property(e => e.Breed).HasColumnType("int");

                entity.Property(e => e.Coverage).HasColumnType("int");

                entity.Property(e => e.Pose).HasColumnType("int");

                entity.Property(e => e.SkinName).HasColumnType("text");

                entity.Property(e => e.SkinUrl).HasColumnType("text");

                entity.Property(e => e.DateCreated);

                entity.Property(e => e.LastViewed);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
