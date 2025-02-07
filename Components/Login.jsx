import React, { useState } from 'react';
import '../CSS/Login.css';
import { verify } from '../Services/Authenticate/Authentication.js';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import {RegisterUser} from '../Services/Authenticate/Authentication.js'
function UserLogin() {
  const queryParameters = new URLSearchParams(window.location.search);
  const status = queryParameters.get("isLogin") === "true";
  const [isLogin, setIsLogin] = useState(status);

  const [logindata, setlogindata] = useState({ LoginEmail: "", LoginPassword: "" });
  const [signupData, setSignupData] = useState({
    firstName: "", lastName: "", email: "", contact: "", gender: "", password: "", confirmPassword: "", role: ""
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  // Handling login
  function handleonchange(e) {
    setlogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  }

  async function handleOnClick() {
    try {
        // Call the verify function to authenticate the user
        const isvalid = await verify(logindata.LoginEmail, logindata.LoginPassword);

        // Check if the response status is 200 (success)
        if (isvalid.status === 200) {
            // Extract user details and token from the response
            const { token, user } = isvalid.data;

            // Save the JWT token and user details in sessionStorage
            sessionStorage.setItem("jwtToken", token);
            sessionStorage.setItem("userDetails", JSON.stringify(user));
            sessionStorage.setItem("userRole",user.role)
            
            console.log("Login Successful!");
            console.log("User Details:", user);
            console.log("JWT Token:", token);

            // Navigate to the appropriate home page based on the user's role
            if (user.role === "USER") {
                navigate('/user/user-home');
            } else if (user.role === "OWNER") {
                navigate('/owner/owner-home');
            } else if (user.role === "ADMIN") {
                navigate('/admin/admin-home');
            }
        } else {
            // If login is not successful, show an error message
            setToastMessage("Invalid email or password.");
            setShowToast(true);
        }
    } catch (error) {
        // Handle errors from the API or network issues
        console.error("Login error:", error.response?.data || error.message);
        setToastMessage("An error occurred during login. Please try again.");
        setShowToast(true);
    }
}

  // Handling signup
  const handlesignup = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

   async function  onsignup()  {
    if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.contact || !signupData.gender || !signupData.password || !signupData.confirmPassword || !signupData.role) {
      setToastMessage("All fields must be filled.");
      setShowToast(true);
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setToastMessage("Passwords do not match.");
      setShowToast(true);
      return;
    }

    //console.log("User SignUp Data:", signupData);
    const registerResponse = await RegisterUser(signupData);
    console.log(registerResponse);
    
    setToastMessage(`${registerResponse.data.message}, You can now login.`);
    setSignupData({
      firstName: "", lastName: "", email: "", contact: "", gender: "", password: "", confirmPassword: "", role: ""
    });
    setShowToast(true);
    setIsLogin(true); // Switch to login view after successful signup
  }

  return (
    <div>
      <div className='container'>
        <div className='form-container'>
          <div className='form-toggle'>
            <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
            <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>SignUp</button>
          </div>

          {isLogin ? (
            <div className="form">
              <h2>Login Form</h2>
              <input
                type="email"
                placeholder="Email"
                name="LoginEmail"
                value={logindata.LoginEmail}
                onChange={handleonchange}
              />
              <input
                type="password"
                placeholder="Password"
                name="LoginPassword"
                value={logindata.LoginPassword}
                onChange={handleonchange}
              />
              <button onClick={handleOnClick}>Login</button>
            </div>
          ) : (
            <div className="form">
              <h2>Signup Form</h2>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={signupData.firstName}
                onChange={handlesignup}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={signupData.lastName}
                onChange={handlesignup}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signupData.email}
                onChange={handlesignup}
              />
              <input
                type="text"
                placeholder="Contact"
                name="contact"
                value={signupData.contact}
                onChange={handlesignup}
              />
              <div id="Gender-section">
                <label>
                  Male
                  <input
                    type="radio"
                    value="male"
                    name="gender"
                    onChange={handlesignup}
                  />
                </label>
                <label>
                  Female
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    onChange={handlesignup}
                  />
                </label>
              </div>

              <select name="role" value={signupData.role || ""} onChange={handlesignup}>
                <option value="" disabled>Select Role</option>
                <option value="user">User</option>
                <option value="owner">Owner</option>
              </select>

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signupData.password}
                onChange={handlesignup}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handlesignup}
              />
              
              <button onClick={onsignup}>Sign up</button>
            </div>
          )}

          {/* Toast Notification */}
          {showToast && (
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
              <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
