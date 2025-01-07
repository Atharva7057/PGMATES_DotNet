using PGMates.Services.Interfaces;
using PGMates.Repository.Interfaces;
namespace PGMates.Services.Implementation
{
    public class AdminServices:IAdminServices
    {
        IAdminRepository _adminRepo;

        public AdminServices(IAdminRepository adminRepository)
        {
            _adminRepo = adminRepository;
        }

        public (int userCount, int ownerCount, int propertyCount) GetDashboardStats()
        {
            var userCount = _adminRepo.GetUserCount();
            var ownerCount = _adminRepo.GetOwnerCount();
            var propertyCount = _adminRepo.GetListedPropertyCount();

            return (userCount, ownerCount, propertyCount);
        }
    }
}
