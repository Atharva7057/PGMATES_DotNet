using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PGMates.Entities
{
        public class Property
        {
            [Key]
            public int PropertyID { get; set; }

            [MaxLength(500)]
            //[RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "Only alphabetic characters and spaces are allowed.")]
            public string Amenities { get; set; }

            public int Capacity { get; set; }

            [Range(0.01, double.MaxValue, ErrorMessage = "Rent must be a positive value.")]
             public double Deposit { get; set; }

            [MaxLength(50)]
            //[RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "Only alphabetic characters and spaces are allowed.")]
            public string ForGender { get; set; }

            [MaxLength(50)]
            //[RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "Only alphabetic characters and spaces are allowed.")]
            public string FurnishType { get; set; }


            [MaxLength(255)]
            public string Location { get; set; }

            public string NearByPlaces { get; set; }

            [Range(0.01, double.MaxValue, ErrorMessage = "Rent must be a positive value.")]
            public double Rent { get; set; }

            [ForeignKey("User")]
            public int OwnerID { get; set; } //userId primary key
            public User Owner { get; set; } //navigation property
            public bool IsAvailable { get; set; }

            [MaxLength(50)]
            //[RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "Only alphabetic characters and spaces are allowed.")]
            public string Type { get; set; }
            public string Description { get; set; }
            
            public string Image { get; set; }
         
            public int AddressID { get; set; } //foreign key
            public Address Address { get; set; } // navigation property....

            public ICollection<Reviews> Reviews { get; set; } //navigation property

            public ICollection<Appointments> Appointments { get; set; } //navigation property
         }
}
