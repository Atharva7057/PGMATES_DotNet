namespace PGMates.DTO
{
    public class AppointmentDtoUser
    {
        public int ApptId { get; set; }

        public DateOnly Date { get; set; }

        public TimeOnly EndTime { get; set; }

        public TimeOnly Time { get; set; }

        public bool IsBooked { get; set; }

        
    }
}
