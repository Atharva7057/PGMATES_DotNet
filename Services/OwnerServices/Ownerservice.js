import axios from 'axios';

const BASE_URL = "http://localhost:5271/api/owner";

class UserServices {

  getAuthHeaders() {
    const token = sessionStorage.getItem("jwtToken");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

  async registerProperty(data) {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const userID = userDetails.userID;
    console.log(userID);
    const formattedData = {
        Amenities: data.amenities ,
        Capacity: data.capacity || 0,
        Deposit: data.deposit || 0,
        ForGender: data.gender,
        FurnishType: data.furnishedType || "",
        Location: data.location || "",
        NearByPlaces: data.nearbyPlaces || "",
        Rent: data.rent || 0.01,
        OwnerID: userID ,
        IsAvailable: true,
        Type: data.propertyType ,
        Description: data.description,
        Image: data.image.name ,
        Address: {
            AddressLine1: data.addressLine1,
            AddressLine2: data.addressLine2,
            City: data.city,
            State:data.state ,
            Pincode: data.pincode ,
      },
    };

    try {
      const response = await axios.post(`${BASE_URL}/RegisterProperty`, formattedData,this.getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error registering property:", error);
      throw error;
    }
  }
}

export default new UserServices();
