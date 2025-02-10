using Microsoft.EntityFrameworkCore;
using PGMates.DTO;
using PGMates.Entities;
using PGMates.Repository.DB_Context;
using PGMates.Repository.Interfaces;

namespace PGMates.Repository.Implementation
{
    public class OwnerRepository : IOwnerRepository
    {
        private EntityContext _context;
        public OwnerRepository(EntityContext context)
        {
            _context = context;
        }


        public async Task<List<PropertyDTOResOwner>> GetPropertiesByOwnerAsync(int ownerId)
        {
            try
            {
                // Fetch properties with their associated address for the given owner ID
                var properties = await _context.Properties
                    .Include(p => p.Address)
                    .Where(p => p.OwnerID == ownerId)
                    .ToListAsync();

                // Convert to DTO list
                var propertyDTOs = properties.Select(property => new PropertyDTOResOwner
                {
                    PropertyID = property.PropertyID,
                    Amenities = property.Amenities,
                    Capacity = property.Capacity,
                    Deposit = property.Deposit,
                    ForGender = property.ForGender,
                    FurnishType = property.FurnishType,
                    Location = property.Location,
                    NearByPlaces = property.NearByPlaces,
                    Rent = property.Rent,
                    IsAvailable = property.IsAvailable,
                    Type = property.Type,
                    Description = property.Description,
                    Image = property.Image,
                    Address = new AddressDTOreq
                    {
                        AddressLine1 = property.Address.AddressLine1,
                        AddressLine2 = property.Address.AddressLine2,
                        City = property.Address.City,
                        State = property.Address.State,
                        Pincode = property.Address.Pincode
                    },
                }).ToList();

                return propertyDTOs;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching properties for the owner: " + ex.Message);
            }
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

        public async Task<bool> UpdateProperty(int propertyId, UpdatePropertyDTO dto)
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

                if (ExistingAddress == null)
                {
                    throw new Exception("Address not found.");
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
                // existingProperty.OwnerID = dto.Own;
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


                // Ensure EF Core tracks changes
                _context.Entry(existingProperty).State = EntityState.Modified;
                _context.Entry(ExistingAddress).State = EntityState.Modified;

                // Save changes to the database
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating property: {ex.Message}");
            }
        }

        public async Task<PropertyDTOResOwner> GetPropertyById(int id)
        {
            var property = await _context.Properties
                .Include(p => p.Address)
                .FirstOrDefaultAsync(p => p.PropertyID == id);

            if (property == null) return null;

            return new PropertyDTOResOwner
            {
                PropertyID = property.PropertyID,
                Amenities = property.Amenities,
                Capacity = property.Capacity,
                Deposit = property.Deposit,
                ForGender = property.ForGender,
                FurnishType = property.FurnishType,
                Location = property.Location,
                NearByPlaces = property.NearByPlaces,
                Rent = property.Rent,
                IsAvailable = property.IsAvailable,
                Type = property.Type,
                Description = property.Description,
                Image = property.Image,
                Address = new AddressDTOreq
                {
                    AddressLine1 = property.Address.AddressLine1,
                    AddressLine2 = property.Address.AddressLine2,
                    City = property.Address.City,
                    State = property.Address.State,
                    Pincode = property.Address.Pincode
                }
            };
        }

        public async Task<bool> DeleteProperty(int propertyId)
        {
            try
            {
                var property = await _context.Properties
                .Include(p => p.Address) // Include the Address relationship
                .FirstOrDefaultAsync(p => p.PropertyID == propertyId);

                if (property == null)
                {
                    return false; // Property not found
                }

                // Remove associated Address first
                if (property.Address != null)
                {
                    _context.Addresses.Remove(property.Address);
                }

                // Remove Property
                _context.Properties.Remove(property);

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting property: {ex.Message}");
            }
        }

        public async Task<bool> TogglePropertyAvailabilityAsync(int propertyId)
        {
            var property = await _context.Properties.FindAsync(propertyId);
            if (property == null) return false;

            property.IsAvailable = !property.IsAvailable;
            await _context.SaveChangesAsync(); // Update database

            return property.IsAvailable; // Return new status
        }

    }
}
