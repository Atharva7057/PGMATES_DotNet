using Microsoft.EntityFrameworkCore;
using PGMates.DTO;
using PGMates.Entities;
using PGMates.Repository.DB_Context;
using PGMates.Repository.Interfaces;

namespace PGMates.Repository.Implementation
{
    public class OwnerRepository:IOwnerRepository
    {
        private EntityContext _context;
        public OwnerRepository(EntityContext context)
        {
            _context = context;
        }

        public async Task<bool> GetPropertyListedByOwner(int ownerId)
        {
            return  false ;
        }

        public async Task<bool> RegisterProperty(PropertyDTOReq dto)
        {
            try
            {
                User owner_ref = await _context.Users.FindAsync(dto.OwnerID);

                var Address = new Address
                {
                    AddressLine1 = dto.Address.AddressLine1,
                    AddressLine2 = dto.Address.AddressLine2,
                    City = dto.Address.City,
                    State = dto.Address.State,
                    Pincode = dto.Address.Pincode,
                    //PropertyID = dto.Address.PropertyID
                };

                var property = new Property
                {
                    Amenities = dto.Amenities,
                    Capacity = dto.Capacity,
                    Deposit = dto.Deposit,
                    ForGender = dto.ForGender,
                    FurnishType = dto.FurnishType,
                    Location = dto.Location,
                    NearByPlaces = dto.NearByPlaces,
                    Rent = dto.Rent,
                    OwnerID = dto.OwnerID,
                    Owner = owner_ref,
                    IsAvailable = dto.IsAvailable,
                    Type = dto.Type,
                    Description = dto.Description,
                    Image = dto.Image,
                    Address = Address 
                };

                await _context.Properties.AddAsync(property);

                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task<bool> UpdateProperty(int propertyId, PropertyDTOReq dto)
        {
            try
            {
                // Find the property to update
                var existingProperty = await _context.Properties
               .Include(p => p.Address) // Include Address to ensure it's loaded
               .FirstOrDefaultAsync(p => p.PropertyID == propertyId);

                var ExistingAddress = await _context.Addresses.FindAsync(existingProperty.AddressID);

                if (existingProperty == null)
                {
                    throw new Exception("Property not found.");
                }
               

                // Update the property fields
                existingProperty.Amenities = dto.Amenities;
                existingProperty.Capacity = dto.Capacity;
                existingProperty.Deposit = dto.Deposit;
                existingProperty.ForGender = dto.ForGender;
                existingProperty.FurnishType = dto.FurnishType;
                existingProperty.Location = dto.Location;
                existingProperty.NearByPlaces = dto.NearByPlaces;
                existingProperty.Rent = dto.Rent;
                existingProperty.OwnerID = dto.OwnerID; 
                existingProperty.IsAvailable = dto.IsAvailable;
                existingProperty.Type = dto.Type;
                existingProperty.Description = dto.Description;
                existingProperty.Image = dto.Image;

                //Update the address fields
                ExistingAddress.AddressLine1 = dto.Address.AddressLine1;
                ExistingAddress.AddressLine2 = dto.Address.AddressLine2;
                ExistingAddress.City = dto.Address.City;
                ExistingAddress.State = dto.Address.State;
                ExistingAddress.Pincode = dto.Address.Pincode;


                // Save changes to the database
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating property: {ex.Message}");
            }
        }
    }
}
