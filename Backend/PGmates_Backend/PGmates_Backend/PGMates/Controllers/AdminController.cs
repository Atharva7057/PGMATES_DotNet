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
    }
}
