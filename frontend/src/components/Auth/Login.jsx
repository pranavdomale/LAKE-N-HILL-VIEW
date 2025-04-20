// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import Navbar from "../Navbar";
// import axios from "axios";
// import { useAuth } from "../Auth/AuthContext";
// import loginimg from "../../assets/login.jpg";

// const Login = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const { setUser } = useAuth();
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
  
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/login",
//         {
//           username: userName,  // ✅ Change "userName" to "username"
//           password,
//         },
//         { withCredentials: true }
//       );
  
//       console.log("Login Response:", response);
  
//       if (response.data && response.data.user) {
//         // Store user info in local storage
//         localStorage.setItem("Username", response.data.user.username);  // Ensure key matches what you want to store
//         localStorage.setItem("userID", response.data.userID); // Optional if returned
  
//         setUser(response.data.user);  // Update context
//         setSuccess("Login successful!");
  
//         // Redirect based on role
//         if (response.data.user.role === "Admin") {
//           navigate("/admin");
//         } else {
//           navigate("/");
//         }
//       } else {
//         throw new Error("Invalid response from server.");
//       }
//     } catch (err) {
//       console.error("Error during login:", err);
//       const errorMessage = err?.response?.data?.message || "Invalid username or password!";
//       setError(errorMessage);
//     }
//   };
  
//   useEffect(() => {
//     try{
//       if (localStorage.getItem("token")) {
//         navigate("/"); // Redirect if already logged in
//       }
//     } catch (err) {
//       console.log('Not logged in:', err);
//     }
//   }, [navigate]);
  
//   return (
  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { FaEnvelope, FaLock } from "react-icons/fa";
  import Navbar from "../Navbar";
  import axios from "axios";
  import { useAuth } from "../Auth/AuthContext";
  import loginimg from "../../assets/login.jpg";
  
  const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { setUser, setCheckLogin } = useAuth();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
  
      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          { username: userName, password },
          { withCredentials: true }
        );
  
        if (response.data?.user) {
          setUser(response.data.user);
          setCheckLogin(true);
          localStorage.setItem("Username", response.data.user.username);
          localStorage.setItem("userID", response.data.userID);
  
          setSuccess("Login successful!");
  
          if (response.data.user.role === "Admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          throw new Error("Invalid response from server.");
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Invalid username or password!");
      }
    };
  
    return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden max-w-full h-screen">
      <Navbar />
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
            <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <div className="relative">
              <input
                type="username"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
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