using PGMates.Repository.DB_Context;
using PGMates.Repository.Interfaces;

namespace PGMates.Repository.Implementation
{
    public class AdminRepository:IAdminRepository
    {
        private readonly EntityContext _context;

        public AdminRepository(EntityContext context)
        {
            _context = context;
        }

        public int GetUserCount()
        {
            return _context.Users.Count();
        }

        public int GetOwnerCount()
        {
            // Assuming User is the owner of the property (based on the relationship)
            return _context.Users
                           .Where(u => u.Properties.Any()) // Check if user has any properties
                           .Count(); // Count distinct users with properties
        }

        public int GetListedPropertyCount()
        {
            return _context.Properties.Count();
        }
    }
}
