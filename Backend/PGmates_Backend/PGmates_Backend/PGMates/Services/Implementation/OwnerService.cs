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

        public Task<bool> UpdateProperty(int propertyId, PropertyDTOReq dto)
        {
            return ownerRepository.UpdateProperty(propertyId, dto);
        }
    }
}
