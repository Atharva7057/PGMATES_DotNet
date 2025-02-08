import React, { useState,useEffect } from "react";
import '../UserComponents/viewDetailsComponents/VD_CSS/viewdetails.css';
import { Map } from './viewDetailsComponents/Map.jsx';
import { useLocation } from "react-router-dom";
import UserServices from '../../Services/UserServices/uservice.js'
const ViewDetails = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const pid = query.get("id")

  const [reviews, setReviews] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showReviews, setShowReviews] = useState(false); 
  const [newReview, setNewReview] = useState({ UserId: 0, Comment: "", Ratings: 0 , propertyId:0}); 
  const [propertyDetails, setPropertyDetails] = useState({}); 
  const [Owner,setOwner] = useState({});
  const[address,setAddress] = useState({addressLine1: "",addressLine2:"",city:"",state:"",pincode:""})
  

  const handleAddReview = async () => {
    if (newReview.Comment && newReview.Ratings) {
      // Create a new review object with propertyId included
      const reviewToAdd = {
        ...newReview,
        propertyId: propertyDetails.propertyID,
      };
      console.log(propertyDetails);
      
      // Logic to add the review (e.g., API call)
      console.log("Adding Review:", reviewToAdd);
      const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
      const userID = userDetails.userID;
      reviewToAdd.UserId = userID;
      
      console.log(userID);
      console.log(reviewToAdd);
      const ReviewAddRes = await UserServices.addReview(reviewToAdd);
      alert(ReviewAddRes.data.message); // Or use ReviewAddRes.data.message if API call succeeds
  
      // Reset the form state
      setNewReview({ userId: 0, Comment: "", Rating: 0, PropertyID: 0 });
    } else {
      alert("Please fill out all fields.");
    }
  };


  useEffect(() => {
    const fetchPropertiesById = async () => {
      try {
        const response = await UserServices.getPropertyDetailsByID(pid);
        console.log(response.data);
        setReviews(response.data.reviews);
        setAppointments(response.data.appointments);
        setOwner(response.data.property.owner);
        setAddress(response.data.property.address)
        setPropertyDetails(response.data.property); 
        // console.log(response.data.property.owner);
        
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchPropertiesById();
  
    
  }, [pid]);

  return (
    <>
      <div id="view-details">
        <section id="property-details">
          <h2>Property Details</h2>
          <p><strong>Amenities:</strong>{propertyDetails.amenities}</p>
          <p><strong>Rent:</strong> ₹{propertyDetails.rent}/month</p>
          <p><strong>Deposit:</strong> ₹{propertyDetails.deposit}</p>
          <p><strong>Location:</strong> {propertyDetails.location}</p>
          <p><strong>Type:</strong> {propertyDetails.type}</p>
          <p><strong>Furnished Type:</strong> {propertyDetails.furnishType}</p>
          <p><strong>Nearby Places:</strong>{propertyDetails.nearByPlaces}</p>
          <p><strong>Capacity:</strong>{propertyDetails.capacity}</p>
          <p><strong>Gender:</strong>{propertyDetails.forGender}</p>
          <p><strong>Description: </strong>{propertyDetails.description}</p>
          {/* <p><strong>Description: </strong>{propertyDetails.propertyID}</p> */}
        </section>
        <section id="property-details">
          <h2>Property Address</h2>
          <p><strong>AddressLine1: </strong>{address.addressLine1}</p>
          <p><strong>AddressLine2: </strong>{address.addressLine2}</p>
          <p><strong>Contact: </strong>{address.city}</p>
          <p><strong>State: </strong>{address.state}</p>
          <p><strong>Pincode: </strong>{address.pincode}</p>
        </section>
        
        
        <section id="property-details">
          <h2>Owner Details</h2>
          <p><strong>Name: </strong>{Owner.firstName} {Owner.lastName}</p>
          <p><strong>Email: </strong>{Owner.email}</p>
          <p><strong>Contact: </strong>{Owner.contact}</p>
        </section>

        <section id="appointment-slots">
          <h2>Available Appointment Slots</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Slot</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}-{appointment.endTime}</td>
                  <td>{appointment.booked ? "Booked" : "Available"}</td>
                  <td>
                    {!appointment.booked && (
                      <button /*onClick={() => bookSlot(appointment.id)}*/>Book</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Map />
        <div id="add-review">
          <h3>Add a Review</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddReview();
            }}
          >
            <textarea
              placeholder="Your Comment"
              value={newReview.Comment}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, Comment: e.target.value }))
              }
              required
            ></textarea>
            <input
              type="number"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              value={newReview.Ratings}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, Ratings: +e.target.value }))
              }
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
        <section id="reviews">
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => setShowReviews(!showReviews)}
          >
            {showReviews ? "Hide Reviews" : "Show Reviews"}
          </h2>

          {showReviews && (
            <>
              <ul>
                {reviews.map((review) => (
                  <li key={review.id}>
                    <p><strong>{review.postedBy.firstName}:</strong> {review.comment}</p>
                    <p>Rating: {review.rating} ⭐</p>
                  </li>
                ))}
              </ul>


            </>
          )}
        </section>
      </div>
    </>
  );
};

export default ViewDetails;
