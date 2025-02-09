import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminCss/AdminUsers.css';

function AdminOwners() {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get('http://localhost:5271/api/admin/owners', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        });

        console.log(response.data); // Check what is returned in the console
        setOwners(response.data); // Save owners to state
      } catch (err) {
        console.error('Error fetching owners:', err);
        //setError('Failed to load owners. Please try again later.');
      }
    };

    fetchOwners(); // Fetch owners on component mount
  }, []);

  // Function to delete an owner with confirmation
  const deleteOwner = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this owner?');
  
    if (confirmed) {
      try {
        // Send delete request to the backend
        const response = await axios.delete(`http://localhost:5271/api/admin/owner/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        });
  
        if (response.status === 200) {
          // Remove the owner from the frontend state
          setOwners(owners.filter((owner) => owner.userID !== id));
        }
      } catch (err) {
        console.error('Error deleting owner:', err);
        setError('Failed to delete owner. Please try again later.');
      }
    }
  };
  

  return (
    <div id="admin-owners">
      <h1>Manage Owners</h1>

      {/* Display error if fetching or deleting fails */}
      {error && <div className="error-message">{error}</div>}

      <div className="owner-list">
        <h2></h2>
        {owners.length === 0 ? (
          <p>No owners found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner.userID}>
                  <td>{owner.firstName} {owner.lastName}</td>
                  <td>{owner.email}</td>
                  <td>{owner.contact}</td>
                  <td>{owner.address ? owner.address : 'No Address Available'}</td>
                  <td>
                    <button onClick={() => deleteOwner(owner.userID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <Link to="/admin/dashboard">
          <button>Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminOwners;
