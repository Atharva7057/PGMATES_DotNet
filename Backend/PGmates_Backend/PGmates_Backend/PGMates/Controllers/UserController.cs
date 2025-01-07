using PGMates.Services;
using PGMates.Entities;
using PGMates.Repository;
using PGMates.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using PGMates.Services.Interfaces;
using PGMates.DTO;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PGMates.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserServices _userServices;


        public UserController(IUserServices userServices)
        {
            _userServices = userServices;
        }


        // GET: api/User/Properties
        [HttpGet("Properties")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> GetAllProperties()
        {
            var properties = await _userServices.GetAllPropertiesAsync();

            return Ok(properties);  // Return properties for the authenticated owner

        }


        // GET: api/User/Property/{id}
        [HttpGet("Property/{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> GetPropertyById(int id)
        {
            // Fetch the property by its ID and ensure it belongs to the specified owner
            var property = await _userServices.GetPropertyByIdAsync(id);
            var reviews = await _userServices.GetAllReviewsByPropertyIdAsync(id);
            var appointments = await _userServices.GetAllAppointmentsByPropertyIdAsync(id);

            if (property == null)
            {
                return NotFound();
            }

            return Ok(new {Property = property,Reviews = reviews, Appointments = appointments});  // Return the property
        }


        // POST: api/User/Review
        [HttpPost("Reviews")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> AddReview([FromBody] ReviewDTOReq review)
        {
            if (review == null)
            {
                return BadRequest(new { Message = "Null Review Cannot be Added" });
            }
            bool res = await _userServices.AddReviewAsync(review);
            if (res)
            {
                return Ok(new { Message = "Review Added!" });
            }
            return BadRequest(new { Message = "Failed to add Review" });
        }
    }
}
