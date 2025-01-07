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
       public  IOwnerServices _ownerServices;
        public OwnerController(IOwnerServices ownerServices)
        {
            _ownerServices = ownerServices;
        }


        // POST api/owner/RegisterProperty
        [HttpPost("RegisterProperty")]
        [Authorize(Roles = "OWNER")]
        public async Task<IActionResult> Post([FromBody] PropertyDTOReq property)
        {     
            bool  res= await  _ownerServices.RegisterProperty(property);
            if (res)
            {
                return Ok(new {Message="Property Listed!"});
            }
            return BadRequest(new { Message = "Failed to list property!" });
        }

        // PUT api/owner/UpdateProperty/5
        [HttpPut("UpdateProperty/{id}")]
        [Authorize(Roles = "OWNER")]
        public async Task<IActionResult> Put(int id, [FromBody] PropertyDTOReq dto)
        {
            bool res = await _ownerServices.UpdateProperty(id, dto);
            if (res)
            {
                return Ok(new { Message = "Property Updated!" });
            }
            return BadRequest(new { Message = "Failed to update property!" });
        }

    }
}
