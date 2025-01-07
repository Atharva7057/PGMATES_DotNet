using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PGMates.Entities
{
   
    public class Address
    {
        [Key] // Marks this as the Primary Key
        public int AddressID { get; set; }

        [Required] // Makes the column non-nullable
        [MaxLength(100)] // Optional: Sets a maximum length for AddressLine1
        public string AddressLine1 { get; set; }

        [MaxLength(100)] // Optional: Sets a maximum length for AddressLine2
        public string AddressLine2 { get; set; }

        [Required] // City cannot be null
        [MaxLength(50)]
        public string City { get; set; }

        [Required] // State cannot be null
        [MaxLength(50)]
        public string State { get; set; }

        [Required] // Pincode cannot be null
        [RegularExpression(@"^\d{6}$", ErrorMessage = "Pincode must be exactly 6 digits.")] // Optional: Sets a length constraint for the Pincode
        public string Pincode { get; set; }

        [ForeignKey("Property")] // Foreign key constraint
        public int PropertyID { get; set; } // PropertyID is the foreign key
        public Property Property { get; set; } // Navigation property
    }
}
