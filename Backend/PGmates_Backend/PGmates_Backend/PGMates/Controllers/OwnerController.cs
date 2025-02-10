using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGMates.DTO;
using PGMates.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PGMates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        public IOwnerServices _ownerServices;
        public OwnerController(IOwnerServices ownerServices)
        {
            _ownerServices = ownerServices;
        }


        // POST api/owner/RegisterProperty
        [HttpPost("RegisterProperty")]
        [Authorize(Roles = "OWNER")]
        public async Task<IActionResult> Post([FromBody] PropertyDTOReq property)
        {
            bool res = await _ownerServices.RegisterProperty(property);
            if (res)
            {
                return Ok(new { Message = "Property Listed!" });
            }
            return BadRequest(new { Message = "Failed to list property!" });
        }

        //GET api/owner/GetPropertiesByOwner/ownerid
        [HttpGet("GetPropertiesByOwner/{ownerId}")]
        [Authorize(Roles = "OWNER")]
        public async Task<IActionResult> GetPropertiesByOwner(int ownerId)
        {
            try
            {
                var properties = await _ownerServices.GetPropertiesByOwnerAsync(ownerId);

                if (properties == null || !properties.Any())
                {
                    return NotFound(new { Message = "No properties found for this owner." });
                }

                return Ok(properties);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Error retrieving properties", Error = ex.Message });
            }
        }



        // PUT api/owner/UpdateProperty/5
        [HttpPut("UpdateProperty/{id}")]
        [Authorize(Roles = "OWNER")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdatePropertyDTO dto)
        {
            bool res = await _ownerServices.UpdateProperty(id, dto);
            if (res)
            {
                return Ok(new { Message = "Property Updated!" });
            }
            return BadRequest(new { Message = "Failed to update property!" });
        }

        //Delete the specific property 
        [HttpDelete("DeleteProperty/{propertyId}")]
        [Authorize(Roles = "OWNER")]
        public async Task<IActionResult> DeletePropertyByIdAsync(int propertyId)
        {
            if (propertyId <= 0)
            {
                return BadRequest(new { message = "Invalid property ID" });
            }

            var result = await _ownerServices.DeletePropertyAsync(propertyId);
            if (!result)
            {
                return NotFound(new { message = "Property not found" });
            }

            return Ok(new { message = "Property deleted successfully" });
        }

        //Getpropeerty by id 
        // GET api/owner/getPropertyDetailsById/5
        [HttpGet("getPropertyDetailsById/{id}")]
        [Authorize(Roles = "OWNER")]
        public async Task<IActionResult> GetPropertyDetailsById(int id)
        {
            var property = await _ownerServices.GetPropertyById(id);
            if (property == null)
                return NotFound(new { message = "Property not found." });

            return Ok(property);
        }

        //toggle the pointer
        [HttpPut("toggleAvailability/{propertyId}")]
        [Authorize(Roles = "OWNER")]
        public async Task<IActionResult> ToggleAvailability(int propertyId)
        {
            var response = await _ownerServices.TogglePropertyAvailability(propertyId);
            return Ok(response);
        }



    }
}
