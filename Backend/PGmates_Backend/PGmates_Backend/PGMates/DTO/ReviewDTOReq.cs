using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PGMates.DTO
{
    public class ReviewDTOReq
    {
        public string Comment { get; set; }
        public int Ratings { get; set; }
        public int UserId { get; set; }
        public int PropertyId { get; set; }
    }
}
