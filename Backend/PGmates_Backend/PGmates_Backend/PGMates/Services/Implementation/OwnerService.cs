using PGMates.DTO;
using PGMates.Repository.Interfaces;
using PGMates.Services.Interfaces;

namespace PGMates.Services.Implementation
{
    public class OwnerService : IOwnerServices
    {
        IOwnerRepository ownerRepository;
        public OwnerService(IOwnerRepository ownerRepository)
        {
            this.ownerRepository = ownerRepository;
        }

        public Task<bool> RegisterProperty(PropertyDTOReq property)
        {
            return ownerRepository.RegisterProperty(property);
        }

        public Task<bool> UpdateProperty(int propertyId, UpdatePropertyDTO dto)
        {
            return ownerRepository.UpdateProperty(propertyId, dto);
        }

        public async Task<List<PropertyDTOResOwner>> GetPropertiesByOwnerAsync(int ownerId)
        {
            return await ownerRepository.GetPropertiesByOwnerAsync(ownerId);
        }

        public async Task<bool> DeletePropertyAsync(int propertyId)
        {
            return await ownerRepository.DeleteProperty(propertyId);
        }

        public async Task<PropertyDTOResOwner> GetPropertyById(int id)
        {
            return await ownerRepository.GetPropertyById(id);
        }
    }
}
