using PGMates.Entities;
using PGMates.Enum;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;// Make sure to include this namespace for JsonConverter
using System.Text.Json.Serialization;

public class User
{
    [Key]
    public int UserID { get; set; } 

    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; }

    [Required]
    [MaxLength(50)]
    [RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "Only alphabetic characters and spaces are allowed.")]
    public string LastName { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(8)]
    public string Password { get; set; } // Ensure password is hashed before saving

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Gender Gender { get; set; } // Changed to enum for controlled values

    //[Required]
    //[RegularExpression(@"^\d{10}$", ErrorMessage = "Contact must be a 10-digit number.")]
    public string Contact { get; set; }

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Roles Role { get; set; }

    public ICollection<Property> Properties { get; set; } // Navigation property
    public ICollection<Appointments> Appointments { get; set; } // Navigation property
}
