using Microsoft.EntityFrameworkCore;
using PGMates.Entities;
using PGMates.Repository.Interfaces;
using PGMates.Repository.DB_Context;
using PGMates.DTO;
namespace PGMates.Repository.Implementation
{
    public class UserRepository:IUserRepository
    {
        private EntityContext _context;
        public UserRepository(EntityContext context)
        {
            _context = context;
        }

       
        public async Task<bool> AddReviewAsync(ReviewDTOReq reviewdto)
        {
            // Assuming _context is your database context
            int userid = reviewdto.UserId;
            int propertyid = reviewdto.PropertyId;

            var user = await _context.Users.FindAsync(userid);
            var property = await _context.Properties.FindAsync(propertyid);

            Reviews review = new Reviews
            {
                Comment = reviewdto.Comment,
                Ratings = reviewdto.Ratings,
                UserId = userid,
                PropertyId = propertyid,
                User = user,
                Property = property
            };

            _context.Reviews.Add(review);
            return await _context.SaveChangesAsync() > 0;
        }

        //Get all properties
        public async Task<List<PropertyDTOResUser>> GetAllPropertiesAsync()
        {

            // Fetch properties from the database
            var properties = await _context.Properties
                .Include(p => p.Owner)
                .Include(p => p.Address)
                .ToListAsync();

            // List to hold mapped PropertyDTOResUser objects
            var propertyDtos = new List<PropertyDTOResUser>();

            // Loop through each property and manually map the values
            foreach (var property in properties)
            {
                var propertyDto = new PropertyDTOResUser
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

                    // Manually map AddressDTO from the Address
                    Address = new AddressDTOreq
                    {
                        AddressLine1 = property.Address.AddressLine1,
                        AddressLine2 = property.Address.AddressLine2,
                        City = property.Address.City,
                        State = property.Address.State,
                        Pincode = property.Address.Pincode
                    },

                    // Manually map UserDTO from the Owner
                    Owner = new UserDto
                    {
                        UserID = property.Owner.UserID,
                        FirstName = property.Owner.FirstName,
                        LastName = property.Owner.LastName,
                        Email = property.Owner.Email,
                        Contact = property.Owner.Contact
                    }
                };

                // Add the mapped property to the list
                propertyDtos.Add(propertyDto);
            }

            return propertyDtos;

        }

        public async Task<List<ReviewDTO>> getAllReviewsByPropertyId(int propertyId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.PropertyId == propertyId)
                .Include(r => r.User)
                .ToListAsync();
            var reviewDtos = new List<ReviewDTO>();
            foreach (var review in reviews)
            {
                var reviewDto = new ReviewDTO
                {
                    ReviewId = review.ReviewId,
                    Rating = review.Ratings,
                    Comment = review.Comment,
                    PostedBy = new UserDto
                    {
                        UserID = review.User.UserID,
                        FirstName = review.User.FirstName,
                        LastName = review.User.LastName,
                        Email = review.User.Email,
                        Contact = review.User.Contact
                    }
                };
                reviewDtos.Add(reviewDto);
            }
            return reviewDtos;
        }

        public async Task<List<AppointmentDtoUser>> getAllAppointments(int propertyId)
        {
            var appointments = await _context.Appointments
                .Where(a => a.PropertyId == propertyId)
                .ToListAsync();
            var appointmentDtos = new List<AppointmentDtoUser>();
            foreach (var appointment in appointments)
            {
                var appointmentDto = new AppointmentDtoUser
                {
                    ApptId = appointment.ApptId,
                    Date = appointment.Date,
                    Time = appointment.Time,
                    EndTime = appointment.EndTime,
                    IsBooked = appointment.IsBooked,
                   
                };
                appointmentDtos.Add(appointmentDto);
            }
            return appointmentDtos;
        }
        // Get Property by ID
        public async Task<PropertyDTOResUser> GetPropertyByIdAsync(int id)
        {
            var property = await _context.Properties
              .Include(p => p.Owner)
              .Include(p => p.Address)
              .FirstOrDefaultAsync(p => p.PropertyID == id);

            if (property == null)
            {
                throw new Exception($"Property with ID {id} not found.");
            }

            var propertyDto = new PropertyDTOResUser
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

                // Manually map AddressDTO from the Address
                Address = new AddressDTOreq
                {
                    AddressLine1 = property.Address.AddressLine1,
                    AddressLine2 = property.Address.AddressLine2,
                    City = property.Address.City,
                    State = property.Address.State,
                    Pincode = property.Address.Pincode
                },

                // Manually map UserDTO from the Owner
                Owner = new UserDto
                {
                    UserID = property.Owner.UserID,
                    FirstName = property.Owner.FirstName,
                    LastName = property.Owner.LastName,
                    Email = property.Owner.Email,
                    Contact = property.Owner.Contact
                }
            };

            return propertyDto;
        }

    }
}
