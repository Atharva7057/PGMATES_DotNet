using PGMates.Enum;
using System.ComponentModel.DataAnnotations;

namespace PGMates.DTO
{
    public class RegisterModel
    {
        [Required]
        public int UserID { get; set; }


        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Contact must be a 10-digit number.")]
        public string Contact { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        public Roles Role { get; set; }
    }
}