import React, { useState } from "react";  
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import registerimg from "../../assets/login.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error] = useState(null);
  const [success] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden w-full h-screen">
      {/* Left Side */}
      <div className="w-3/5 bg-cover bg-center" style={{ backgroundImage: `url(${registerimg})` }}>
        <div className="h-full flex justify-center items-center bg-opacity-50 bg-black">
          <h2 className="text-white text-3xl font-bold px-4">
            To keep connected with the largest shop in the world.
          </h2>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-2/5 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="User Name"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute inset-y-0 right-4 flex items-center">
                <FaUser />
              </span>
            </div>
          </div>
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
              />
              <span className="absolute inset-y-0 right-4 flex items-center">
                <FaLock />
              </span>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <input type="checkbox" className="mr-2" />
            <p className="text-sm">
              I agree to the <span className="text-indigo-500 underline">Terms</span> and{" "}
              <span className="text-indigo-500 underline">Privacy</span>.
            </p>
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
        <p className="text-sm mt-4 text-center">
          Already a member? <Link to="/login" className="text-indigo-500 underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;