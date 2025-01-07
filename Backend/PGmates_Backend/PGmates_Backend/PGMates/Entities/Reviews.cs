using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PGMates.Entities
{
    public class Reviews
    {
        [Key]
        public int ReviewId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Comment { get; set; }

        [Required]
        [MaxLength(255)]
        public int Ratings { get; set; }

        
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }


        [ForeignKey("Property")]
        public int PropertyId { get; set; }
        public Property Property { get; set; }
    }
}
