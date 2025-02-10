import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import OwnerNav from '../Components/OwnerComponents/OwnerNav';
import OwnerHome from "../Components/OwnerComponents/OwnerHome";
import Demo from "../Components/OwnerComponents/Demo";
import ContactUs from "../Components/OwnerComponents/ContactUs";
import Services from "../Components/OwnerComponents/Services";
import Appointments from "../Components/OwnerComponents/Appointments";
import PropertyListings from "../Components/OwnerComponents/PropertyListings";
import RegisterProperty from '../Components/OwnerComponents/RegisterProperty';
import UpdateProperty  from '../Components/OwnerComponents/UpdateProperty.jsx';
import Profile from "../Components/OwnerComponents/Profile";
import AccessDenied from './AccessDenied';
import UserLogin from '../Components/Login';

const OwnerLayout = () => (
  <>
    <OwnerNav />
    <Outlet /> {/* Nested routes will render here */}
  </>
);

function OwnerRoutes() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Add loading state
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    const role = sessionStorage.getItem('userRole');

    if (token && role === 'OWNER') {
      setIsAuthenticated(true);
      setIsOwner(true);
    } else if (token && role !== 'OWNER') {
      setIsAuthenticated(true);
      setIsOwner(false);
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

  return (
    <Routes>
      {/* Owner Layout Route */}
      <Route element={<OwnerLayout />}>
        {/* Nested Route under Owner Layout */}
        <Route path="owner-home" element={isOwner ? <OwnerHome /> : <AccessDenied />} />
        <Route path="services" element={isOwner ? <Services /> : <AccessDenied />} />
        <Route path="appointments" element={isOwner ? <Appointments /> : <AccessDenied />} />
        <Route path="propertylistings" element={isOwner ? <PropertyListings /> : <AccessDenied />} />
        <Route path="registerproperty" element={isOwner ? <RegisterProperty /> : <AccessDenied />} />
        <Route path="contact" element={isOwner ? <ContactUs /> : <AccessDenied />} />
        <Route path="profile" element={isOwner ? <Profile /> : <AccessDenied />} />
        <Route path="UpdateProperty" element={isOwner ? < UpdateProperty/> : <AccessDenied />} />
      </Route>

      {/* Routes for non-authenticated users */}
      <Route path="access-denied" element={<AccessDenied />} />
      <Route path="login" element={<UserLogin />} />
    </Routes>
  );
}

export default OwnerRoutes;
