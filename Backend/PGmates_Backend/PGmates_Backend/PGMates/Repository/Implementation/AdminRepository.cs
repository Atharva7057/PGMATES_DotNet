using Microsoft.EntityFrameworkCore;
using PGMates.DTO;
using PGMates.Entities;
using PGMates.Repository.DB_Context;
using PGMates.Repository.Interfaces;
using PGMates.Enum; // This is necessary to access the Roles enum


namespace PGMates.Repository.Implementation
{
    public class AdminRepository : IAdminRepository
    {
        private readonly EntityContext _context;

        public AdminRepository(EntityContext context)
        {
            _context = context;
        }

        public int GetUserCount()
        {
            // Count only users with the 'USER' role
            return _context.Users
                           .Where(u => u.Role == Roles.USER) // Ensure to count only users with 'USER' role
                           .Count();
        }

        public int GetOwnerCount()
        {
            // Specifically count users with the 'OWNER' role
            return _context.Users
                           .Where(u => u.Role == Roles.OWNER) // Only count users who are owners
                           .Count();
        }

        public int GetListedPropertyCount()
        {
            return _context.Properties.Count();
        }


        // Fetch all listed properties
        public IEnumerable<AdminPropertyDTO> GetListedProperties()
        {
            return _context.Properties
                .Include(p => p.Owner)   // Ensure the related Owner is loaded
                .Include(p => p.Address)  // Ensure the related Address is loaded
                .Select(p => new AdminPropertyDTO
                {
                    PropertyID = p.PropertyID,
                    Amenities = p.Amenities,
                    Capacity = p.Capacity,
                    Deposit = p.Deposit,
                    ForGender = p.ForGender,
                    FurnishType = p.FurnishType,
                    Location = p.Location,
                    NearByPlaces = p.NearByPlaces,
                    Rent = p.Rent,
                    Type = p.Type,
                    Description = p.Description,
                    Image = p.Image,
                    IsAvailable = p.IsAvailable,

                    // Map the Address DTO, check if the Address is not null
                    Address = p.Address != null ? new AddressDTOreq
                    {
                        AddressLine1 = p.Address.AddressLine1,
                        AddressLine2 = p.Address.AddressLine2,
                        City = p.Address.City,
                        State = p.Address.State,
                        Pincode = p.Address.Pincode
                    } : null,

                    // Map the Owner DTO, check if the Owner is not null
                    Owner = p.Owner != null ? new UserDto
                    {
                        UserID = p.Owner.UserID,
                        FirstName = p.Owner.FirstName,
                        LastName = p.Owner.LastName,
                        Email = p.Owner.Email,
                        Contact = p.Owner.Contact,
                        Role = p.Owner.Role
                    } : null
                })
                .ToList();
        }



        public bool DeleteProperty(int propertyId)
        {
            var property = _context.Properties.FirstOrDefault(p => p.PropertyID == propertyId);

            if (property == null)
            {
                return false;  // Property not found
            }

            _context.Properties.Remove(property);
            _context.SaveChanges();

            return true;  // Property successfully deleted
        }

        // Method to get all users as DTO
        public IEnumerable<UserDto> GetAllUsers()
        {
            // Fetch only users with the 'USER' role
            return _context.Users
                           .Where(u => u.Role == Roles.USER) // Only fetch users with 'USER' role
                           .Select(u => new UserDto
                           {
                               UserID = u.UserID,
                               FirstName = u.FirstName,
                               LastName = u.LastName,
                               Contact = u.Contact,
                               Email = u.Email,
                               Role = u.Role
                           })
                           .ToList();
        }


        public bool DeleteUser(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserID == userId);

            if (user == null)
            {
                return false;  // User not found
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return true;  // User successfully deleted
        }

        public IEnumerable<OwnerDto> GetAllOwners()
        {
            return _context.Users
                           .Where(u => u.Role == Roles.OWNER) // Filter for users with the OWNER role
                           .Include(u => u.Properties)  // Include the properties for each user
                           .ThenInclude(p => p.Address) // Include the address for each property
                           .Select(u => new OwnerDto
                           {
                               UserID = u.UserID,
                               FirstName = u.FirstName,
                               LastName = u.LastName,
                               Contact = u.Contact,
                               Email = u.Email,
                               // Safely retrieve the address by checking if the first property exists and has an address
                               Address = u.Properties.Any() && u.Properties.FirstOrDefault().Address != null
                                         ? u.Properties.FirstOrDefault().Address.AddressLine1
                                         : null // If no property or no address, return null
                           })
                           .ToList();
        }

        public bool DeleteOwner(int ownerId)
        {
            // Retrieve the owner and include related properties (if any)
            var owner = _context.Users
                                .Include(u => u.Properties)  // Make sure properties are loaded
                                .FirstOrDefault(u => u.UserID == ownerId && u.Role == Roles.OWNER);

            if (owner == null)
            {
                return false;  // Owner not found
            }

            // If the owner has properties, they will be deleted automatically due to cascade delete
            _context.Users.Remove(owner);  // Remove the owner
            _context.SaveChanges();  // Commit changes, properties will be deleted as well due to cascade

            return true;  // Owner and associated properties successfully deleted
        }




    }
}
