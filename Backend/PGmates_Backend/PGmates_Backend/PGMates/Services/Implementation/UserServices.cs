using PGMates.Entities;
using PGMates.Repository.DB_Context;
using PGMates.Repository.Interfaces;
using PGMates.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using PGMates.DTO;


namespace PGMates.Services.Implementation
{
    public class UserServices : IUserServices

    {
        IUserRepository _repo;
        private EntityContext _context;
        public UserServices(EntityContext context, IUserRepository repo)
        {
            _context = context;
            _repo = repo;
        }
        public async Task<bool> AddReviewAsync(ReviewDTOReq review)
        {
            return await _repo.AddReviewAsync(review);
        }

        public async Task<List<AppointmentDtoUser>> GetAllAppointmentsByPropertyIdAsync(int id)
        {
           return await _repo.getAllAppointments(id);
        }

        public async Task<List<PropertyDTOResUser>>GetAllPropertiesAsync()
        {
            return await _repo.GetAllPropertiesAsync();
        }

        public async Task<List<ReviewDTO>> GetAllReviewsByPropertyIdAsync(int id)
        {
           return await _repo.getAllReviewsByPropertyId(id);
        }

        public async Task<PropertyDTOResUser> GetPropertyByIdAsync(int id)
        {
         
            return await _repo.GetPropertyByIdAsync(id);
        }

      
    }
}
