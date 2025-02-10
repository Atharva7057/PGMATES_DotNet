namespace PGMates.DTO
{
    public class UpdatePropertyDTO
    {
        //public int PropertyID { get; set; }
        //public int OwnerID { get; set; }
        public string Amenities { get; set; }
        public int Capacity { get; set; }
        public double Deposit { get; set; }
        public string ForGender { get; set; }
        public string FurnishType { get; set; }
        public string Location { get; set; }
        public string NearByPlaces { get; set; }
        public double Rent { get; set; }
        public bool IsAvailable { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public AddressDTOreq Address { get; set; }

        /*
         *  private String location;
    private double rent;  
    private double deposit;
    private String type;
    private int owner;
    private String image;
    private int capacity;
    private String amenities;
    private String nearByPlaces;
    private String forGender;
    private String furnishType;
    private AddressDtoToRegisterProperty address;
    private boolean isavailable;
         */

    }
}
