using PGMates.DTO;

namespace PGMates.Services.Interfaces
{
    public interface IOwnerServices
    {
        public Task<bool> RegisterProperty(PropertyDTOReq property);
        public Task<bool> UpdateProperty(int propertyId, UpdatePropertyDTO dto);
        public Task<List<PropertyDTOResOwner>> GetPropertiesByOwnerAsync(int ownerId);
        public Task<bool> DeletePropertyAsync(int propertyId);

        public Task<PropertyDTOResOwner> GetPropertyById(int id);
    }
}
