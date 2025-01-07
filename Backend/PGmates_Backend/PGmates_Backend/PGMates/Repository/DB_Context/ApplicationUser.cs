using Microsoft.AspNetCore.Identity;
using PGMates.Entities;
using PGMates.Enum;
using System.ComponentModel.DataAnnotations;

namespace PGMates.DB_Context
{
    public class ApplicationUser : IdentityUser
    {
        public Roles Role { get; set; } // Keep this to store roles in the AspNetUsers table

    }
}