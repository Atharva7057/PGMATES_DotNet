using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGMates.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PGMates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
            IAdminServices _adminServices;

            public AdminController(IAdminServices adminServices)
            {
                _adminServices = adminServices;
            }


            // GET: api/<OwnerController>
         [HttpGet("stats")]
        [Authorize(Roles= "ADMIN")]
        public IActionResult GetDashboardStats()
        {
            var (userCount, ownerCount, propertyCount) = _adminServices.GetDashboardStats();

            return Ok(new
            {
                UserCount = userCount,
                OwnerCount = ownerCount,
                PropertyCount = propertyCount
            });
        }

        // New endpoint to get listed properties
        [HttpGet("properties")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult GetListedProperties()
        {
            var properties = _adminServices.GetListedProperties(); // Call the service layer

            if (properties == null || !properties.Any())
            {
                return NotFound("No properties found.");
            }

            return Ok(properties);
        }

        [HttpDelete("property/{id}")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult RemoveProperty(int id)
        {
            var result = _adminServices.RemoveProperty(id);

            if (result)
            {
                return Ok(new { message = "Property removed successfully." });
            }

            return NotFound("Property not found.");
        }


        // GET: api/admin/users
        [HttpGet("users")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult GetAllUsers()
        {
            var users = _adminServices.GetAllUsers(); // Fetch all users from service layer

            if (users == null || !users.Any())
            {
                return NotFound("No users found.");
            }

            return Ok(users); // Return the list of users
        }

        // DELETE: api/admin/user/{id}
        [HttpDelete("user/{id}")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult DeleteUser(int id)
        {
            var result = _adminServices.DeleteUser(id);

            if (result)
            {
                return Ok(new { message = "User deleted successfully." });
            }

            return NotFound("User not found.");
        }



        // GET: api/admin/owners
        [HttpGet("owners")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult GetAllOwners()
        {
            var owners = _adminServices.GetAllOwners(); // Fetch all owners from the service layer

            if (owners == null || !owners.Any())
            {
                return NotFound("No owners found.");
            }

            return Ok(owners); // Return the list of owners
        }

        [HttpDelete("owner/{id}")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult DeleteOwner(int id)
        {
            var result = _adminServices.DeleteOwner(id);

            if (result)
            {
                var owners = _adminServices.GetAllOwners();  // Fetch updated owner list
                var ownerCount = owners.Count();  // Get the updated count
                return Ok(new { message = "Owner deleted successfully." });
            }

            return NotFound("Owner not found.");
        }


    }
}
