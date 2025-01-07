using PGMates.DTO;

namespace PGMates.Services.Interfaces
{
    public interface IOwnerServices
    {
        public Task<bool> RegisterProperty(PropertyDTOReq property);
        public  Task<bool> UpdateProperty(int propertyId, PropertyDTOReq dto);
    }
}
