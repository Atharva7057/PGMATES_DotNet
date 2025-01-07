using PGMates.DTO;

namespace PGMates.Repository.Interfaces
{
    public interface IOwnerRepository
    {
        public  Task<bool> RegisterProperty(PropertyDTOReq property);
        public Task<bool> UpdateProperty(int propertyId, PropertyDTOReq dto);
        
        public Task<bool> GetPropertyListedByOwner(int ownerId);
    }
}
