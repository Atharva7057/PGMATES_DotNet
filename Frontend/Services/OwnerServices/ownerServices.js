import axios from 'axios';

const BASE_URL = "http://localhost:5271/api/owner";

class OwnerServices {

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

  async getAllPropertiesByOwner() {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const ownerId = userDetails.userID;
    try {
      //GetPropertiesByOwner/${userDetails.userID}`
      const response = await axios.get(`${BASE_URL}/GetPropertiesByOwner/${ownerId}`, this.getAuthHeaders());
      console.log(response);

      return response.data;
    } catch (error) {
      console.error("Error fetching property:", error);
      throw error;
    }
  }

  async updateProperty(propertyID,data) {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const userID = userDetails.userID;
    console.log(userID);
    const formattedData = {
      amenities: data.amenities,
      capacity: data.capacity || 0,
      deposit: data.deposit || 0,
      forGender: data.gender,
      furnishType: data.furnishedType || "",
      location: data.location || "",
      description: data.description || "",
      nearByPlaces: data.nearbyPlaces || "",
      rent: data.rent || 0.01,
      ownerID: userID,
      isavailable: true,
      type: data.propertyType,
      image: data.image,
      address: {
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      },
    };
    console.log(formattedData);


    try {
      const response = await axios.put(`${BASE_URL}/UpdateProperty/${propertyID}`, formattedData, this.getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error registering property:", error);
        console.error('Error updating property:', error.response ? error.response.data : error.message);
        console.log("API Response:", response);
      throw error;
    }
  }
  // async deleteProperty(propertyID) {
  //   const token = sessionStorage.getItem("jwtToken");

  //   try {
  //     const deleteResponse = await axios.delete(`${BASE_URL}/DeleteProperty/${propertyID}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     return deleteResponse.data;
  //   } catch (error) {
  //     console.error("Error deleting property:", error);
  //     throw error;
  //   }
  // }

  async deleteProperty(propertyID){
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const ownerId = userDetails.userID;
    try{
      const deleteSlotResponse = await axios.delete(`${BASE_URL}/DeleteProperty/${propertyID}`, this.getAuthHeaders());
      return deleteSlotResponse.data;
    }catch(error){
      console.log(error);
    }
  }

  async getPropertyDetails(propertyID) {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const ownerId = userDetails.userID;
    try {
      const response = await axios.get(`${BASE_URL}/getPropertyDetailsById/${propertyID}`, this.getAuthHeaders());
      console.log(response);

      return response.data;
    } catch (error) {
      console.error("Error fetching property:", error);
      throw error;
    }
  }

  // async deleteProperty(PropertyId){
  //   const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
  //   const ownerId = userDetails.userID;
  //   try{
  //     const deleteSlotResponse = await axios.delete(`${BASE_URL}/DeleteProperty/${PropertyId}`, this.getAuthHeaders());
  //     return deleteSlotResponse.data;
  //   }catch(error){
  //     console.log(error);
  //   }
  // }


  async toggleAvailability(propertyID){
    try{
      const updateSlotResponse = await axios.put(`${BASE_URL}/toggleAvailability/${propertyID}`, this.getAuthHeaders());
      return updateSlotResponse.data;
    }catch(error){
      console.log(error);
    }
  }

}

export default new OwnerServices();