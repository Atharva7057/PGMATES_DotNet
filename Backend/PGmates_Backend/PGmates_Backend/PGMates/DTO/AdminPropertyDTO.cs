namespace PGMates.DTO
{
    public class AdminPropertyDTO
    {
        public int PropertyID { get; set; }
        public string Amenities { get; set; }
        public int Capacity { get; set; }
        public double Deposit { get; set; }
        public string ForGender { get; set; }
        public string FurnishType { get; set; }
        public string Location { get; set; }
        public string NearByPlaces { get; set; }
        public double Rent { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public bool IsAvailable { get; set; }

        // Address details as a separate object
        public AddressDTOreq Address { get; set; }

        // Owner details as a separate object
        public UserDto Owner { get; set; }
    }
}
