using PGMates.DTO;
using PGMates.Entities;

namespace PGMates.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<List<PropertyDTOResUser>> GetAllPropertiesAsync();
        Task<PropertyDTOResUser> GetPropertyByIdAsync(int id);
        Task<bool> AddReviewAsync(ReviewDTOReq review);
        public  Task<List<ReviewDTO>> getAllReviewsByPropertyId(int propertyId);
        public  Task<List<AppointmentDtoUser>> getAllAppointments(int propertyId);


    }
}
