import React, { useEffect, useState } from 'react';
import { Route, Routes, Outlet, useNavigate, Navigate } from 'react-router-dom';
import AdminHome from '../Components/AdminComponents/AdminHome.jsx';
import AdminNav from '../Components/AdminComponents/AdminNav.jsx';
import AdminDashboard from '../Components/AdminComponents/AdminDashboard.jsx';
import PropertiesList from '../Components/AdminComponents/PropertiesList.jsx';
import AccessDenied from './AccessDenied.jsx';
import UserLogin from '../Components/Login.jsx';
import AdminUsers from '../Components/AdminComponents/AdminUsers.jsx';
import AdminOwners from '../Components/AdminComponents/AdminOwners.jsx';
import AdminPropertyListings from '../Components/AdminComponents/AdminPropertyListings.jsx';

const AdminLayout = () => (
  <>
    <AdminNav />
    <Outlet />
  </>
);

function AdminRoutes() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Add loading state
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    const role = sessionStorage.getItem('userRole');

    if (token && role === 'ADMIN') {
      setIsAuthenticated(true);
      setIsAdmin(true);
    } else if (token && role !== 'ADMIN') {
      setIsAuthenticated(true);
      setIsAdmin(false);
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!isAuthenticated) {
    navigate('/login'); // Redirect to login if not logged in
    return null;
  }

  // Redirect if user is not an admin
  if (!isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  return (
    <Routes>
      {/* Admin Layout Route */}
      <Route element={<AdminLayout />}>
        {/* Nested Route under Admin Layout */}
        <Route path="admin-home" element={isAdmin ? <AdminHome /> : <AccessDenied />} />
        <Route path="dashboard" element={isAdmin ? <AdminDashboard /> : <AccessDenied />} />
        <Route path="property-listings" element={isAdmin ? <PropertiesList /> : <AccessDenied />} />
        <Route path="manage-users" element={isAdmin ? <AdminUsers /> : <AccessDenied />} />
        <Route path="manage-owners" element={isAdmin ? <AdminOwners /> : <AccessDenied />} />
        <Route path="manage-properties" element={isAdmin ? <AdminPropertyListings /> : <AccessDenied />} />
      </Route>

      <Route path="access-denied" element={<AccessDenied />} />
      <Route path="login" element={<UserLogin />} />
    </Routes>
  );
}

export default AdminRoutes;
