using PGMates.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PGMates.DTO
{
    public class PropertyDTOReq
    {

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
        public int OwnerID { get; set; }
        public bool IsAvailable { get; set; }

        [MaxLength(50)]
        //[RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "Only alphabetic characters and spaces are allowed.")]
        public string Type { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public AddressDTOreq Address { get; set; } 
    }
}
