using PGMates.DTO;
using PGMates.Entities;

namespace PGMates.Repository.Interfaces
{
    public interface IAdminRepository
    {
        int GetUserCount();
        int GetOwnerCount();
        int GetListedPropertyCount();

        IEnumerable<AdminPropertyDTO> GetListedProperties(); // Method to get listed properties

        bool DeleteProperty(int propertyId); // Method to delete a property from the database

        // New method to get all users
        IEnumerable<UserDto> GetAllUsers();  // Method to get all users

        bool DeleteUser(int userId); // Method to delete a user

        IEnumerable<OwnerDto> GetAllOwners(); // Method to fetch all owners

        //method to delete an owner
        bool DeleteOwner(int ownerId);
    }
}
