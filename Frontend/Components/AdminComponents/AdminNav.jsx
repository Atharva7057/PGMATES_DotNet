// import React from 'react';
// import { Link } from "react-router-dom";
// import './AdminCss/AdminNav.css'; // Import the CSS file for styling

// function AdminNav() {
//   return (
//     <div id="admin-nav">
//       <div id="nav-links">
//         <Link to='/admin/admin-home'>Home</Link>
//         <Link to='/admin/dashboard'>Dashboard</Link>
//         <Link to='/admin/property-listings'>Properties</Link>
//       </div>
      
//     </div>
//   );
// }

// export default AdminNav;

import React from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import './AdminCss/AdminNav.css'; // Import the CSS file for styling

function AdminNav() {
  const navigate = useNavigate();  // useNavigate hook for redirecting

  // Handle logout functionality
  const handleLogout = () => {
    // Clear the session or token
    sessionStorage.removeItem("jwtToken");

    // Redirect to the landing page (login/signup page)
    navigate("/");  // Assuming "/" is the landing page route
  };

  return (
    <div id="admin-nav">
      <div id="nav-links">
        <Link to='/admin/admin-home'>Home</Link>
        <Link to='/admin/dashboard'>Dashboard</Link>
        <Link to='/admin/property-listings'>Properties</Link>
      </div>

      {/* Add the Logout button on the right side */}
      <div id="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default AdminNav;