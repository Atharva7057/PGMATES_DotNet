using PGMates.Services.Interfaces;
using PGMates.Repository.Interfaces;
using PGMates.Repository.Implementation;
using PGMates.Entities;
using PGMates.DTO;
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
            var userCount = _adminRepo.GetUserCount(); // Total users
            var ownerCount = _adminRepo.GetOwnerCount(); // Total owners
            var propertyCount = _adminRepo.GetListedPropertyCount(); // Total properties

            return (userCount, ownerCount, propertyCount);
        }


        // Implement the method to get listed properties
        public IEnumerable<AdminPropertyDTO> GetListedProperties()
        {
            return _adminRepo.GetListedProperties(); // Fetch properties from the repository
        }

        public bool RemoveProperty(int propertyId)
        {
            return _adminRepo.DeleteProperty(propertyId); // Call repository to delete the property
        }
        // Implement the GetAllUsers method
        public IEnumerable<UserDto> GetAllUsers()
        {
            return _adminRepo.GetAllUsers();  // Fetch all users from the repository
        }

        public bool DeleteUser(int userId)
        {
            return _adminRepo.DeleteUser(userId); // Call repository to delete the user
        }

        public IEnumerable<OwnerDto> GetAllOwners()
        {
            return _adminRepo.GetAllOwners(); // Fetch all owners from the repository
        }

        //public bool DeleteOwner(int ownerId)
        //{
        //    return _adminRepo.DeleteOwner(ownerId); // Call repository to delete the owner
        //}

        public bool DeleteOwner(int ownerId)
        {
            bool isDeleted = _adminRepo.DeleteOwner(ownerId); // Delete the owner

            // After deletion, fetch the updated list of owners (you can optionally handle this in a more optimized way)
            if (isDeleted)
            {
                return true;
            }
            return false;
        }


    }
}
