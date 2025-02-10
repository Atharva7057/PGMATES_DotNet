namespace PGMates.DTO
{
    public class AvailabilityResponse
    {
        public string Message { get; set; }
        public bool Availability { get; set; }

        public AvailabilityResponse(string message, bool availability)
        {
            Message = message;
            Availability = availability;
        }
    }
}
