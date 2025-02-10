using PGMates.DTO;

namespace PGMates.Repository.Interfaces
{
    public interface IOwnerRepository
    {
        public Task<bool> RegisterProperty(PropertyDTOReq property);
        public Task<bool> UpdateProperty(int propertyId, UpdatePropertyDTO dto);

        Task<List<PropertyDTOResOwner>> GetPropertiesByOwnerAsync(int ownerId);
        public Task<PropertyDTOResOwner> GetPropertyById(int id);
        Task<bool> DeleteProperty(int propertyId);
    }
}
