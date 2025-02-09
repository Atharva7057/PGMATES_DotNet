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

// import React, { useState } from 'react';
// import '../CSS/Login.css';  // Assuming your CSS file styles the page
// import { verify} from '../Services/Authenticate/Authentication.js';
// import { useNavigate } from 'react-router-dom';
// import Toast from 'react-bootstrap/Toast';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
// import {RegisterUser} from '../Services/Authenticate/Authentication.js'

// // import { verify } from '../Services/Authenticate/Authentication.js';
// // import { useNavigate } from 'react-router-dom';
// // import Toast from 'react-bootstrap/Toast';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import {RegisterUser} from '../Services/Authenticate/Authentication.js'

// function UserLogin() {
//   const queryParameters = new URLSearchParams(window.location.search);
//   const status = queryParameters.get("isLogin") === "true";
//   const [isLogin, setIsLogin] = useState(status);

//   const [logindata, setlogindata] = useState({ LoginEmail: "", LoginPassword: "" });
//   const [signupData, setSignupData] = useState({
//     firstName: "", lastName: "", email: "", contact: "", gender: "", password: "", confirmPassword: "", role: ""
//   });

//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const navigate = useNavigate();

//   // Handling login
//   function handleonchange(e) {
//     setlogindata({
//       ...logindata,
//       [e.target.name]: e.target.value,
//     });
//   }

//   async function handleOnClick() {
//     console.log(logindata.LoginEmail + " " + logindata.LoginPassword);
    
//     if (!logindata.LoginEmail || !logindata.LoginPassword) {
//       setToastMessage("Please fill in both email and password.");
//       setShowToast(true);
//       return;
//     }
  
//     try {
//       const loginResponse = await verify(logindata.LoginEmail, logindata.LoginPassword);
  
//       if (loginResponse.status === 200) {
//         const { token, user } = loginResponse.data;
        
//         sessionStorage.setItem("jwtToken", token);
//         sessionStorage.setItem("userDetails", JSON.stringify(user));
//         sessionStorage.setItem("userRole", user.role);
  
//         if (user.role === "ROLE_USER") {
//           navigate('/user/user-home');
//         } else if (user.role === "ROLE_OWNER") {
//           navigate('/owner/owner-home');
//         } else if (user.role === "ROLE_ADMIN") {
//           navigate('/admin/admin-home');
//         }
//       } else {
//         setToastMessage("Invalid email or password.");
//         setShowToast(true);
//       }
//     } catch (error) {
//       setToastMessage(error.response?.data.message || error.message);
//       setShowToast(true);
//     }
//   }

//   // Handling signup
//   const handlesignup = (e) => {
//     const { name, value } = e.target;
//     setSignupData({
//       ...signupData,
//       [name]: value,
//     });
//   };

//   async function onsignup() {
//     // Regular expression patterns for validation
//     const nameRegex = /^[A-Za-z]+$/; // Only alphabets allowed for first name and last name
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Valid email pattern
//     const contactRegex = /^\d{10}$/; // Only 10 digit numbers allowed for contact
//     const passwordRegex= /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
//     // Validate that all required fields are filled
//     if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.contact || !signupData.gender || !signupData.password || !signupData.confirmPassword || !signupData.role) {
//       setToastMessage("All fields must be filled.");
//       setShowToast(true);
//       return;
//     }

//     // Validate first name and last name
//     if (!nameRegex.test(signupData.firstName)) {
//       setToastMessage("First name can only contain letters.");
//       setShowToast(true);
//       return;
//     }
  
//     if (!nameRegex.test(signupData.lastName)) {
//       setToastMessage("Last name can only contain letters.");
//       setShowToast(true);
//       return;
//     }
  
//     // Validate email format
//     if (!emailRegex.test(signupData.email)) {
//       setToastMessage("Please enter a valid email address.");
//       setShowToast(true);
//       return;
//     }
  
//     // Validate contact number format (10 digits)
//     if (!contactRegex.test(signupData.contact)) {
//       setToastMessage("Contact number should be 10 digits.");
//       setShowToast(true);
//       return;
//     }

//     // Validate password strength
//     if (!passwordRegex.test(signupData.password)) {
//       setToastMessage("Password should contain 1 Uppercase, 1 special, 1 Numeric character, and should be 8 characters long.");
//       setShowToast(true);
//       return;
//     }

//     // Check if passwords match
//     if (signupData.password !== signupData.confirmPassword) {
//       setToastMessage("Passwords do not match.");
//       setShowToast(true);
//       return;
//     }

//     // Proceed with registration if all validations pass
//     try {
//       const registerResponse = await registerUser(signupData);
//       if(registerResponse.status === 200){
//         setToastMessage(`${registerResponse.data.message}, You can now login.`);
//         setSignupData({
//           firstName: "", lastName: "", email: "", contact: "", gender: "", password: "", confirmPassword: "", role: ""
//         });
//         setShowToast(true);
//         setIsLogin(true); // Switch to login view after successful signup
//       } else {
//         setToastMessage(`${registerResponse.data.message}`);
//         setShowToast(true);
//         setIsLogin(false);
//       }
//     } catch (error) {
//       setToastMessage(error.response?.data.message || error.message);
//       setShowToast(true);
//     }
//   }
  
//   return (
//     <div className="login-container">
//       <div className="form-container">
//         <div className="form-toggle">
//           <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
//           <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>SignUp</button>
//         </div>

//         {isLogin ? (
//           <div className="form">
//             <h2 className='formName'>Login</h2>
//             <div className='icon-fields'>
//               <FaEnvelope className="icon" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 name="LoginEmail"
//                 value={logindata.LoginEmail}
//                 onChange={handleonchange}
//                 className="input-field"
//               />
//             </div>
            
//             <div className='icon-fields'>
//               <FaLock className='icon' />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 name="LoginPassword"
//                 value={logindata.LoginPassword}
//                 onChange={handleonchange}
//                 className="input-field"
//               />
//             </div>
            
//             <button onClick={handleOnClick} className="btn-submit">Login</button>
//           </div>
//         ) : (
//           <div className="form">
//             <h2 className='formName'>Signup</h2>
//             <div className='icon-fields'>
//               <FaUser className="icon" />
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 name="firstName"
//                 value={signupData.firstName}
//                 onChange={handlesignup}
//                 className="input-field"
//               />
//             </div>
//             <div className='icon-fields'>
//               <FaUser className="icon" />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 name="lastName"
//                 value={signupData.lastName}
//                 onChange={handlesignup}
//                 className="input-field"
//               />
//             </div>
//             <div className='icon-fields'>
//               <FaEnvelope className="icon" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 value={signupData.email}
//                 onChange={handlesignup}
//                 className="input-field"
//               />
//             </div>
//             <div className='icon-fields'>
//               <FaPhone className="icon" />
//               <input
//                 type="text"
//                 placeholder="Contact"
//                 name="contact"
//                 value={signupData.contact}
//                 onChange={handlesignup}
//                 className="input-field"
//               />
//             </div>

//             <div id="Gender-section" className="gender-section">
//               <label>
//                 Male
//                 <input
//                   type="radio"
//                   value="MALE"
//                   name="gender"
//                   onChange={handlesignup}
//                   className="gender-input"
//                 />
//               </label>
//               <label>
//                 Female
//                 <input
//                   type="radio"
//                   value="FEMALE"
//                   name="gender"
//                   onChange={handlesignup}
//                   className="gender-input"
//                 />
//               </label>
//             </div>

//             <select name="role" value={signupData.role || ""} onChange={handlesignup} className="input-field">
//               <option value="" disabled>Select Role</option>
//               <option value="ROLE_USER">User</option>
//               <option value="ROLE_OWNER">Owner</option>
//             </select>

//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={signupData.password}
//               onChange={handlesignup}
//               className="input-field"
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               name="confirmPassword"
//               value={signupData.confirmPassword}
//               onChange={handlesignup}
//               className="input-field"
//             />

//             <button onClick={onsignup} className="btn-submit">Sign Up</button>
//           </div>
//         )}

//         {/* Toast Notification */}
//         {showToast && (
//           <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide className="toast-notification">
//             <Toast.Body>{toastMessage}</Toast.Body>
//           </Toast>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserLogin;


// import React, { useState } from 'react';
// import '../CSS/Login.css'; // Assuming your CSS file styles the page
// import { verify } from '../Services/Authenticate/Authentication.js';
// import { useNavigate } from 'react-router-dom';
// import Toast from 'react-bootstrap/Toast';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
// import { RegisterUser } from '../Services/Authenticate/Authentication.js';

// function UserLogin() {
//   const queryParameters = new URLSearchParams(window.location.search);
//   const status = queryParameters.get("isLogin") === "true";
//   const [isLogin, setIsLogin] = useState(status);

//   const [logindata, setlogindata] = useState({ LoginEmail: "", LoginPassword: "" });
//   const [signupData, setSignupData] = useState({
//     firstName: "", lastName: "", email: "", contact: "", gender: "", password: "", confirmPassword: "", role: ""
//   });

//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const navigate = useNavigate();

//   function handleonchange(e) {
//     setlogindata({
//       ...logindata,
//       [e.target.name]: e.target.value,
//     });
//   }

//   async function handleOnClick() {
//     if (!logindata.LoginEmail || !logindata.LoginPassword) {
//       setToastMessage("Please fill in both email and password.");
//       setShowToast(true);
//       return;
//     }

//     try {
//       const loginResponse = await verify(logindata.LoginEmail, logindata.LoginPassword);

//       if (loginResponse.status === 200) {
//         const { token, user } = loginResponse.data;

//         sessionStorage.setItem("jwtToken", token);
//         sessionStorage.setItem("userDetails", JSON.stringify(user));
//         sessionStorage.setItem("userRole", user.role);

//         if (user.role === "ROLE_USER") {
//           navigate('/user/user-home');
//         } else if (user.role === "ROLE_OWNER") {
//           navigate('/owner/owner-home');
//         } else if (user.role === "ROLE_ADMIN") {
//           navigate('/admin/admin-home');
//         }
//       } else {
//         setToastMessage("Invalid email or password.");
//         setShowToast(true);
//       }
//     } catch (error) {
//       setToastMessage(error.response?.data.message || error.message);
//       setShowToast(true);
//     }
//   }

//   const handlesignup = (e) => {
//     const { name, value } = e.target;
//     setSignupData({
//       ...signupData,
//       [name]: value,
//     });
//   };

//   async function onsignup() {
//     if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.contact || !signupData.gender || !signupData.password || !signupData.confirmPassword || !signupData.role) {
//       setToastMessage("All fields must be filled.");
//       setShowToast(true);
//       return;
//     }

//     if (signupData.password !== signupData.confirmPassword) {
//       setToastMessage("Passwords do not match.");
//       setShowToast(true);
//       return;
//     }

//     try {
//       const registerResponse = await RegisterUser(signupData);
//       if (registerResponse.status === 200) {
//         setToastMessage(`${registerResponse.data.message}, You can now login.`);
//         setSignupData({
//           firstName: "", lastName: "", email: "", contact: "", gender: "", password: "", confirmPassword: "", role: ""
//         });
//         setShowToast(true);
//         setIsLogin(true);
//       } else {
//         setToastMessage(`${registerResponse.data.message}`);
//         setShowToast(true);
//       }
//     } catch (error) {
//       setToastMessage(error.response?.data.message || error.message);
//       setShowToast(true);
//     }
//   }

//   return (
//     <div className="auth-container">
//       <div className="auth-form-container">
//         <div className="auth-form-toggle">
//           <button className={isLogin ? 'active' : "inactive"} onClick={() => setIsLogin(true)}>Login</button>
//           <button className={!isLogin ? 'active' : "inactive"} onClick={() => setIsLogin(false)}>SignUp</button>
//         </div>

//         {isLogin ? (
//           <div className="auth-form">
//             <h2 className="auth-form-title">Login</h2>

//             <div className="auth-input-group">
//               <FaEnvelope className="auth-icon" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 name="LoginEmail"
//                 value={logindata.LoginEmail}
//                 onChange={handleonchange}
//                 className="auth-input-field"
//               />
//             </div>

//             <div className="auth-input-group">
//               <FaLock className="auth-icon" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 name="LoginPassword"
//                 value={logindata.LoginPassword}
//                 onChange={handleonchange}
//                 className="auth-input-field"
//               />
//             </div>

//             <button onClick={handleOnClick} className="auth-btn-submit">Login</button>
//           </div>
//         ) : (
//           <div className="auth-form">
//             <h2 className="auth-form-title">Signup</h2>

//             <input type="text" placeholder="First Name" name="firstName" value={signupData.firstName} onChange={handlesignup} className="auth-input-field" />
//             <input type="text" placeholder="Last Name" name="lastName" value={signupData.lastName} onChange={handlesignup} className="auth-input-field" />
//             <input type="email" placeholder="Email" name="email" value={signupData.email} onChange={handlesignup} className="auth-input-field" />
//             <input type="text" placeholder="Contact" name="contact" value={signupData.contact} onChange={handlesignup} className="auth-input-field" />

//             <div className="auth-gender-section">
//               <label><input type="radio" value="MALE" name="gender" onChange={handlesignup} /> Male</label>
//               <label><input type="radio" value="FEMALE" name="gender" onChange={handlesignup} /> Female</label>
//             </div>

//             <select name="role" value={signupData.role || ""} onChange={handlesignup} className="auth-select-role">
//               <option value="" disabled>Select Role</option>
//               <option value="ROLE_USER">User</option>
//               <option value="ROLE_OWNER">Owner</option>
//             </select>

//             <input type="password" placeholder="Password" name="password" value={signupData.password} onChange={handlesignup} className="auth-input-field" />
//             <input type="password" placeholder="Confirm Password" name="confirmPassword" value={signupData.confirmPassword} onChange={handlesignup} className="auth-input-field" />

//             <button onClick={onsignup} className="auth-btn-submit">Sign Up</button>
//           </div>
//         )}

//         {showToast && (
//           <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide className="auth-toast-notification">
//             <Toast.Body>{toastMessage}</Toast.Body>
//           </Toast>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserLogin;

