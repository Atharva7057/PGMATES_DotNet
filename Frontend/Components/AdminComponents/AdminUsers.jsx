import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminCss/AdminUsers.css';


function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);  // Optional error state for handling fetch issues

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5271/api/admin/users', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        });
        setUsers(response.data);  // Save users to state
      } catch (err) {
        console.error('Error fetching users:', err);
        // setError('Failed to load users. Please try again later.');
      }
    };

    fetchUsers(); // Fetch users on component mount
  }, []);

  // Function to delete a user
  const deleteUser = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5271/api/admin/user/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        });
        // Refresh the user list after deletion
        setUsers(users.filter((user) => user.userID !== id));
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user. Please try again later.');
      }
    }
  };
  

  return (
    <div id="admin-users">
      <h1>Manage Users</h1>

      {/* Display error if fetching or deleting fails */}
      {error && <div className="error-message">{error}</div>}

      <div className="user-list">
        <h2></h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userID}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => deleteUser(user.userID)}>Delete</button>
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

export default AdminUsers;
