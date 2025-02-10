using PGMates.DTO;
using PGMates.Entities;

namespace PGMates.Services.Interfaces
{
    public interface IAdminServices
    {
        (int userCount, int ownerCount, int propertyCount) GetDashboardStats();

        IEnumerable<AdminPropertyDTO> GetListedProperties(); // Add method to get listed properties

        bool RemoveProperty(int propertyId);  // Method to remove a property

        // New method to get all users
        IEnumerable<UserDto> GetAllUsers();  // Method to fetch all users

        bool DeleteUser(int userId); // Method to delete a user

        IEnumerable<OwnerDto> GetAllOwners(); // Method to fetch all owners
    
        // method to delete an owner
        bool DeleteOwner(int ownerId);

    }
}
