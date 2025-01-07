using PGMates.DTO;
using PGMates.Entities;

namespace PGMates.Services.Interfaces
{
    public interface IUserServices
    {
        Task<List<PropertyDTOResUser>> GetAllPropertiesAsync();

        Task<PropertyDTOResUser> GetPropertyByIdAsync(int id);

        Task<List<ReviewDTO>> GetAllReviewsByPropertyIdAsync(int id);
        Task<List<AppointmentDtoUser>> GetAllAppointmentsByPropertyIdAsync(int id);
        //Task<User> GetUserByIdAsync(Reviews review);

        Task<bool> AddReviewAsync(ReviewDTOReq review);
        //Task<User> AuthenticateAsync(string username, string password);

    }
}
