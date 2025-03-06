// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import axios from "axios";
// import { useAuth } from "./AuthContext";
// import loginimg from "../../assets/login.jpg";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const { setUser } = useAuth();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/login",
//         formData,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       console.log(response); // Log the entire response for debugging

//       // Set user data in context
//       setUser({
//         name: formData.email.split("@")[0],  // Or use response.data.user.name if available
//         email: formData.email,
//         _id: response.data.user._id,  // Store user ID if needed
//       });

//       setSuccess("Login successful!");

//       // Navigate based on credentials
//       if (formData.email === "admin@gmail.com" && formData.password === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       setError("Invalid email or password!");
//     }
//   };

//   return (
//     <div className="flex bg-white shadow-md rounded-lg overflow-hidden max-w-full h-screen">
//       {/* Right Side (Image) */}
//       <div className="w-3/5 bg-cover bg-center" style={{ backgroundImage: `url(${loginimg})` }}>
//         <div className="h-full flex justify-center items-center bg-opacity-50 bg-black">
//           <h2 className="text-white text-3xl font-bold px-4">
//             To keep connected with the largest shop in the world.
//           </h2>
//         </div>
//       </div>

//       {/* Left Side (Content) */}
//       <div className="w-2/5 p-8 flex flex-col justify-center">
//         <h2 className="text-2xl font-bold mb-4">Sign In</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//             <div className="relative">
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email Address"
//                 className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//               <span className="absolute inset-y-0 right-4 flex items-center">
//                 <FaEnvelope />
//               </span>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <div className="relative">
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//               <span className="absolute inset-y-0 right-4 flex items-center">
//                 <FaLock />
//               </span>
//             </div>
//           </div>
//           <div className="flex items-center mb-6 justify-between">
//             <div>
//               <input type="checkbox" className="mr-2" />
//               <label className="text-sm">Remember me</label>
//             </div>
//             <Link to="/forget-password" className="text-indigo-500 underline text-sm">
//               Forgot Password?
//             </Link>
//           </div>
//           <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
//             Sign In
//           </button>
//         </form>
//         {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
//         {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
//         <p className="text-sm mt-4 text-center">
//           Don't have an account? <Link to="/register" className="text-indigo-500 underline">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";
import loginimg from "../../assets/login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   setSuccess(null);

  //   try {
  //     const response = await axios.post("http://localhost:5000/login", formData, {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true, // Ensure cookies are sent with requests
  //     });
  //     console.log("Login Response:", response);

  //     if (response.status === 200) {
  //       setUser(response.data.user);
  //       setSuccess("Login successful!");
  //       setTimeout(() => navigate("/"), 1000); // Delay navigation for a better UX
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Invalid email or password!");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    try {
      const response = await axios.post(
        "http://localhost:5001/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Login Response:", response);
  
      // Ensure user data exists in the response
      if (response.data && response.data.user) {
        // Set user data in context
        setUser(response.data.user);
  
        setSuccess("Login successful!");
  
        // Navigate based on credentials
        if (
          formData.email === "admin@gmail.com" &&
          formData.password === "admin"
        ) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      const errorMessage = err?.response?.data?.message || "Invalid email or password!";
      setError(errorMessage);
    }    
  };  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); // Redirect if already logged in
    }
  }, [navigate]);

  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden max-w-full h-screen">
      <div className="w-3/5 bg-cover bg-center" style={{ backgroundImage: `url(${loginimg})` }}>
        <div className="h-full flex justify-center items-center bg-opacity-50 bg-black">
          <h2 className="text-white text-3xl font-bold px-4">
            To keep connected with the largest shop in the world.
          </h2>
        </div>
      </div>

      <div className="w-2/5 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <span className="absolute inset-y-0 right-4 flex items-center">
                <FaEnvelope />
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <span className="absolute inset-y-0 right-4 flex items-center">
                <FaLock />
              </span>
            </div>
          </div>
          <div className="flex items-center mb-6 justify-between">
            <div>
              <input type="checkbox" className="mr-2" />
              <label className="text-sm">Remember me</label>
            </div>
            <Link to="/forget-password" className="text-indigo-500 underline text-sm">
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
        <p className="text-sm mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-indigo-500 underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;