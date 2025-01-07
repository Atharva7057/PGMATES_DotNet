using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PGMates.Entities
{
    public class Appointments
    {
        [Key]
        public int ApptId { get; set; }

        public DateOnly Date { get; set; }

        public TimeOnly EndTime { get; set; }

        public TimeOnly Time { get; set; }

        public bool IsBooked { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Property")]
        public int PropertyId { get; set; }
        public Property Property { get; set; }

        [ForeignKey("OwnerId")]
        public int OwnerId { get; set; } // This is the foreign key column to the User table
        public User Owner { get; set; }

    }

}
