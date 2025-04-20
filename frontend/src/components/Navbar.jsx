import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import Axios from "axios";
import { useAuth } from "../components/Auth/AuthContext";
import { CircleUser } from 'lucide-react';

const Navbar = () => {
  const { checkLogin, setCheckLogin, user, setUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await Axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      setUser(null);
      setCheckLogin(false);
      alert("Logged out successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <nav
        className={`flex items-center justify-between w-full h-20 fixed top-0 left-0 z-50 px-4 md:px-12
          transition-all duration-300 ease-in-out ${isSidebarOpen ? "bg-transparent" : "bg-black/30 backdrop-blur-md"}`}
      >
        {/* Brand */}
        <div className={`${isSidebarOpen ? "opacity-0" : "opacity-100"} transition-opacity duration-300 ease-in-out`}>
          <p className="font-bold text-2xl md:text-3xl text-white cursor-pointer" onClick={() => navigate("/")}>
            Lake N Hill <span className="text-pink-600">View</span>
          </p>
        </div>

        {/* Login/Profile/Sidebar */}
        <div className="flex items-center space-x-4 relative">
          {!isSidebarOpen && (
            <div className="transition-opacity duration-300 ease-in-out">
              {checkLogin ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 bg-white/10 border border-white px-4 py-2 rounded-full text-white hover:text-pink-600 transition-all duration-300"
                >
                  <CircleUser/>
                  <span className="font-semibold">{user?.username}</span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white shadow-lg rounded-xl overflow-hidden z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-600 transition duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-white hover:text-pink-600 border border-white hover:border-pink-600
                  py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10 backdrop-blur-sm"
              >
                <span>LOGIN</span>
                <CiLogin className="text-xl" />
              </Link>
            )}
            </div>
          )}
          <button onClick={toggleSidebar} className="text-white hover:text-pink-600 transition-colors duration-300">
            {isSidebarOpen ? <IoMdClose className="text-4xl" /> : <IoIosMenu className="text-4xl" />}
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-gradient-to-br from-gray-900 to-gray-800
        transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        z-40 overflow-y-auto`}>
        <div className="p-8 text-white">
        <nav className="flex flex-col space-y-6 mb-30">
  {["Home", "Service", "About Us", "Contact", "My Booking"].map((name) => (
    <Link
      key={name}
      to={name === "Home" ? "/" : `/${name.toLowerCase().replace(" ", "-")}`}
      onClick={toggleSidebar}  // This part ensures sidebar always closes
      className="text-2xl font-bold hover:text-pink-600 transition-all duration-300 ease-in-out transform hover:translate-x-2"
    >
      {name}
    </Link>
  ))}
</nav>

        </div>
      </div>
    </div>
  );
};

export default Navbar;