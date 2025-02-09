

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AdminCss/AdminDashboard.css';

// function AdminDashboard() {
//   // Initialize state to hold the dynamic data
//   const [stats, setStats] = useState({
//     activeUsers: 0,
//     activeOwners: 0,
//     listedProperties: 0,
//   });
//   const [error, setError] = useState(null); // Handle errors (optional)

//   // Fetch the stats from the API when the component mounts
//   useEffect(() => {
//     // Fetch data from the backend
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get('http://localhost:5271/api/admin/stats', {
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
//           },
//         });
//         setStats({
//           activeUsers: response.data.userCount,
//           activeOwners: response.data.ownerCount,
//           listedProperties: response.data.propertyCount,
//         });
//       } catch (err) {
//         console.error('Error fetching stats:', err);
//         setError('Failed to load statistics. Please try again later.');
//       }
//     };

//     fetchStats(); // Call the function when the component mounts
//   }, []); // Empty dependency array ensures this runs once when the component mounts

//   return (
//     <div id="dashboard">
//       <div id="dashboard-container">
//         <h1>Admin Dashboard</h1>

//         {/* Display error if fetching fails */}
//         {error && <div className="error-message">{error}</div>}

//         <div id="dashboard-stats">
//           <div className="stat-card">
//             <h3>Active Users</h3>
//             <p>{stats.activeUsers}</p>
//           </div>
//           <div className="stat-card">
//             <h3>Active Owners</h3>
//             <p>{stats.activeOwners}</p>
//           </div>
//           <div className="stat-card">
//             <h3>Listed Properties</h3>
//             <p>{stats.listedProperties}</p>
//           </div>
//         </div>

//         <div id="dashboard-actions">
//           <div className="action-card">
//             <h3>Manage Users</h3>
//             <p>View and manage all active users.</p>
//             <button>View Users</button>
//           </div>
//           <div className="action-card">
//             <h3>Manage Properties</h3>
//             <p>View and manage property listings.</p>
//             <button>View Properties</button>
//           </div>
//           <div className="action-card">
//             <h3>Analytics</h3>
//             <p>View platform activity and trends.</p>
//             <button>View Analytics</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './AdminCss/AdminDashboard.css';

function AdminDashboard() {
  // Initialize state to hold the dynamic data
  const [stats, setStats] = useState({
    activeUsers: 0,
    activeOwners: 0,
    listedProperties: 0,
  });
  const [error, setError] = useState(null); // Handle errors (optional)

  // Fetch the stats from the API when the component mounts
  useEffect(() => {
    // Fetch data from the backend
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5271/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        });
        setStats({
          activeUsers: response.data.userCount,
          activeOwners: response.data.ownerCount,
          listedProperties: response.data.propertyCount,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load statistics. Please try again later.');
      }
    };

    fetchStats(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div id="dashboard">
      <div id="dashboard-container">
        <h1>Admin Dashboard</h1>

        {/* Display error if fetching fails */}
        {error && <div className="error-message">{error}</div>}

        <div id="dashboard-stats">
          <div className="stat-card">
            <h3>Active Users</h3>
            <p>{stats.activeUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Active Owners</h3>
            <p>{stats.activeOwners}</p>
          </div>
          <div className="stat-card">
            <h3>Listed Properties</h3>
            <p>{stats.listedProperties}</p>
          </div>
        </div>

        <div id="dashboard-actions">
          <div className="action-card">
            <h3>Manage Users</h3>
            <p>View and manage all active users.</p>
            {/* Navigate to the "Manage Users" page */}
            <Link to="/admin/manage-users">
              <button>View Users</button>
            </Link>
          </div>
          <div className="action-card">
            <h3>Manage Owners</h3>
            <p>View and manage all owners.</p>
            {/* Navigate to the "Manage Owners" page */}
            <Link to="/admin/manage-owners">
              <button>View Owners</button>
            </Link>
          </div>
          <div className="action-card">
            <h3>Manage Properties</h3>
            <p>View and manage all property listings.</p>
            {/* Navigate to the "Manage Properties" page */}
            <Link to="/admin/manage-properties">
              <button>View Properties</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
