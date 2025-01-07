using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using PGMates.Entities;
using PGMates.DB_Context;

namespace PGMates.Repository.DB_Context
{
    public class EntityContext : IdentityDbContext<ApplicationUser>
    {
        public EntityContext(DbContextOptions<EntityContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Appointments> Appointments { get; set; }
        public DbSet<Reviews> Reviews { get; set; }
        public DbSet<Address> Addresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // user and property: One-to-Many Relationship
            modelBuilder.Entity<User>().
                HasMany(u => u.Properties). //Owner(UserRole) has many properties
                WithOne(p => p.Owner). //property has one owner
                HasForeignKey(p => p.OwnerID).OnDelete(DeleteBehavior.Cascade);

            // user and appointments: One-to-Many Relationship
            modelBuilder.Entity<User>().
                HasMany(u => u.Appointments). //user has many appointments
                WithOne(a => a.User). //appointment has one user
                HasForeignKey(a => a.UserId).OnDelete(DeleteBehavior.Cascade);

            // property and user: One-to-Many Relationship
            modelBuilder.Entity<Property>()
               .HasOne(p => p.Owner) // Property has one Owner
               .WithMany(u => u.Properties) // User can own many Properties
               .HasForeignKey(p => p.OwnerID) // Foreign key in Property
               .OnDelete(DeleteBehavior.Restrict); // Prevent cascading deletes

            // Property and Address: One-to-One Relationship
            modelBuilder.Entity<Property>()
                .HasOne(p => p.Address) // Property has one Address
                .WithOne() // Address doesn't navigate back to Property
                .HasForeignKey<Property>(p => p.AddressID) // Foreign key in Property
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete if Property is deleted

            // Property and Reviews: One-to-Many Relationship
            modelBuilder.Entity<Property>()
                .HasMany(p => p.Reviews) // Property has many Reviews
                .WithOne(r => r.Property) // Review is associated with one Property
                .HasForeignKey(r => r.PropertyId) // Foreign key in Reviews
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete Reviews when Property is deleted

            // Property and Appointments: One-to-Many Relationship
            modelBuilder.Entity<Property>()
                .HasMany(p => p.Appointments) // Property has many Appointments
                .WithOne(a => a.Property) // Appointment is associated with one Property
                .HasForeignKey(a => a.PropertyId) // Foreign key in Appointments
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete Appointments when Property is deleted


            // Appointments  and  User : Many-to-One Relationship
            modelBuilder.Entity<Appointments>()
                .HasOne(a => a.User) // Appointment has one User
                .WithMany(u => u.Appointments) // User can have many Appointments
                .HasForeignKey(a => a.UserId) // Foreign key in Appointments
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading deletes

            // Appointments and Property:Many-to-One Relationship
            modelBuilder.Entity<Appointments>()
                .HasOne(a => a.Property) // Navigation property
                .WithMany(p => p.Appointments) // Property can have multiple appointments
                .HasForeignKey(a => a.PropertyId) // Foreign key in Appointments table
                .OnDelete(DeleteBehavior.Restrict); // Restrict delete to avoid cascading deletes


            modelBuilder.Entity<Appointments>()
                .HasOne(a => a.Owner)
                .WithMany()
                .HasForeignKey(a => a.OwnerId);


            // Reviews and User: Many-to-One Relationship
            modelBuilder.Entity<Reviews>()
               .HasOne(r => r.User)  // A Review has one User
               .WithMany()  // No reverse navigation from User to Reviews
               .HasForeignKey(r => r.UserId);  // Foreign key in Review table

            // Reviews and User: Many-to-One Relationship
            modelBuilder.Entity<Reviews>()
                .HasOne(r => r.Property) // Review has one Property
                .WithMany(p => p.Reviews) // Property can have many Reviews
                .HasForeignKey(r => r.PropertyId); // Foreign key in Reviews
                //.OnDelete(DeleteBehavior.Restrict); // Prevent cascading deletes

            modelBuilder.Entity<Address>()
                .HasOne(a => a.Property) // Address has one Property
                .WithOne(p => p.Address) // Property has one Address
                .HasForeignKey<Property>(p => p.AddressID); // Foreign key in Property
        }
    }
   
}
