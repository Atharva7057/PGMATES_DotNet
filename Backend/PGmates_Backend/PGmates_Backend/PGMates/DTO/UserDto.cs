using PGMates.Enum;
using System.ComponentModel.DataAnnotations;

namespace PGMates.DTO
{
    public class UserDto
    {
        
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }

        public Roles Role { get; set; }
    }
}
