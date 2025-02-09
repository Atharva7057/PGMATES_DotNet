import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminCss/AdminProperties.css';

function AdminPropertyListings() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);  // State for selected property
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5271/api/admin/properties', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        });
        setProperties(response.data);  // Save properties to state
      } catch (err) {
        console.error('Error fetching properties:', err);
        //setError('Failed to load properties. Please try again later.');
      }
    };

    fetchProperties();  // Fetch properties on component mount
  }, []);

  // Function to delete a property
  const deleteProperty = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?');

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5271/api/admin/property/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        });
        // Refresh the property list after deletion
        setProperties(properties.filter((property) => property.propertyID !== id));
      } catch (err) {
        console.error('Error deleting property:', err);
        setError('Failed to delete property. Please try again later.');
      }
    }
  };

  // Function to handle showing the modal with property details
  const viewPropertyDetails = (property) => {
    setSelectedProperty(property);  // Set selected property
    setShowModal(true);  // Show the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedProperty(null);  // Reset selected property
  };

  return (
    <div id="admin-properties">
      <h1>Manage Properties</h1>

      {/* Display error if fetching or deleting fails */}
      {error && <div className="error-message">{error}</div>}

      <div className="property-list">
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Property ID</th>
                <th>Location</th>
                <th>Owner</th>
                <th>Rent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.propertyID}>
                  <td>{property.propertyID}</td>
                  <td>{property.location}</td>
                  <td>{property.owner.firstName} {property.owner.lastName}</td>
                  <td>{property.rent}</td>
                  <td>
                    {/* Button to view property details */}
                    <button onClick={() => viewPropertyDetails(property)}>View Details</button>
                    {/* Button to delete property */}
                    <button onClick={() => deleteProperty(property.propertyID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for displaying full property details */}
      {showModal && selectedProperty && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Property Details</h2>
            <p><strong>Property ID:</strong> {selectedProperty.propertyID}</p>
            <p><strong>Location:</strong> {selectedProperty.location}</p>
            <p><strong>Owner:</strong> {selectedProperty.owner.firstName} {selectedProperty.owner.lastName}</p>
            <p><strong>Rent:</strong> {selectedProperty.rent}</p>
            <p><strong>Description:</strong> {selectedProperty.description}</p>
            <p><strong>Amenities:</strong> {selectedProperty.amenities}</p>
            <p><strong>Capacity:</strong> {selectedProperty.capacity}</p>
            <p><strong>Deposit:</strong> {selectedProperty.deposit}</p>
            <p><strong>Nearby Places:</strong> {selectedProperty.nearByPlaces}</p>
            <p><strong>Furnish Type:</strong> {selectedProperty.furnishType}</p>
            <p><strong>For Gender:</strong> {selectedProperty.forGender}</p>
            
            {/* Property Image */}
            <div className="property-image">
              <img
                src={`http://localhost:5271/images/${selectedProperty.image}`}  // Adjust path to where the image is hosted
                alt="Property Image"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <Link to="/admin/dashboard">
          <button>Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminPropertyListings;
