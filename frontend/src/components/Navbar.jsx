// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { IoIosMenu } from "react-icons/io";
// import { IoMdClose } from "react-icons/io";
// import { CiLogin } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";
// import Axios from "axios";

// const Navbar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [checkLogin, setCheckLogin] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await Axios.get("http://localhost:5000/checkLogin", {
//           withCredentials: true, // Sends cookies with the request
//         });
//         const data = response.data;
//         if (data.ok) {
//           setUser(data.user); // Assuming `data.user` contains user details
//           setCheckLogin(true);
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setCheckLogin(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await Axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
//       setUser(null);
//       setCheckLogin(false);
//       alert("Logged out successfully.");
//       navigate("/");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav
//         className={`flex items-center justify-between w-full h-20 
//         fixed top-0 left-0 z-50 px-4 md:px-12
//         transition-all duration-300 ease-in-out
//         ${isSidebarOpen ? "bg-transparent" : "bg-black/30 backdrop-blur-md"}`}
//       >
//         {/* Brand Name */}
//         <div
//           className={`transition-opacity duration-300 ease-in-out
//           ${isSidebarOpen ? "opacity-0" : "opacity-100"}`}
//         >
//           <p
//             className="font-bold text-2xl md:text-3xl text-white cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             Lake N Hill <span className="text-pink-600">View</span>
//           </p>
//         </div>

//         {/* Login/Profile and Menu */}
//         <div className="flex items-center space-x-4 relative">
//           {!isSidebarOpen && (
//             <div className="transition-opacity duration-300 ease-in-out">
//               {checkLogin ? (
//                 <div className="relative" tabIndex={0}>
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="flex items-center gap-2 text-white text-lg hover:text-pink-600 transition-colors"
//                   >
//                     <CgProfile className="text-4xl" />
//                     <span>{user?.name}</span>
//                   </button>
//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
//                       <div className="px-4 py-2">
//                         <p className="text-gray-800 font-bold">{user?.name}</p>
//                         <p className="text-sm text-gray-500">{user?.email}</p>
//                       </div>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="
//                   flex items-center justify-center gap-2
//                   text-white hover:text-pink-600
//                   border border-white hover:border-pink-600
//                   py-2 px-4 rounded-full
//                   transition-all duration-300 ease-in-out
//                   hover:bg-white/10 backdrop-blur-sm"
//                 >
//                   <span>LOGIN</span> <CiLogin className="text-xl" />
//                 </Link>
//               )}
//             </div>

//           )}
//           <button
//             onClick={toggleSidebar}
//             className="text-white hover:text-pink-600 transition-colors duration-300"
//           >
//             {isSidebarOpen ? <IoMdClose className="text-4xl" /> : <IoIosMenu className="text-4xl" />}
//           </button>
//         </div>
//       </nav>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full w-full md:w-96
//         bg-gradient-to-br from-gray-900 to-gray-800
//         transform transition-transform duration-300 ease-in-out
//         ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
//         z-40 overflow-y-auto`}
//       >
//         {/* Sidebar Content */}
//         <div className="p-8 text-white">
//           {/* Navigation Links */}
//           <nav className="flex flex-col space-y-6 mb-12">
//             {[{ name: "Home", path: "/" }, { name: "Service", path: "/service" }, { name: "About Us", path: "/about-us" }, { name: "Contact", path: "/contact" }, { name: "My Booking", path: "/my-booking" }].map(
//               (item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   onClick={toggleSidebar}
//                   className="text-2xl font-bold hover:text-pink-600 
//                   transition-all duration-300 ease-in-out
//                   transform hover:translate-x-2"
//                 >
//                   {item.name}
//                 </Link>
//               )
//             )}
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import Axios from "axios";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Axios.get("http://localhost:5000/checkLogin", {
          withCredentials: true,
        });
        if (response.data.ok) {
          setUser(response.data.user);
          setCheckLogin(true);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setCheckLogin(false);
      }
    };

    fetchUser();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {/* Navbar */}
      <nav
        className={`flex items-center justify-between w-full h-20 
          fixed top-0 left-0 z-50 px-4 md:px-12
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "bg-transparent" : "bg-black/30 backdrop-blur-md"}`}
      >
        {/* Brand Name */}
        <div className={`${isSidebarOpen ? "opacity-0" : "opacity-100"} transition-opacity duration-300 ease-in-out`}>
          <p
            className="font-bold text-2xl md:text-3xl text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            Lake N Hill <span className="text-pink-600">View</span>
          </p>
        </div>

        {/* Profile/Login and Sidebar Menu */}
        <div className="flex items-center space-x-4 relative">
          {!isSidebarOpen && (
            <div className="transition-opacity duration-300 ease-in-out">
              {checkLogin ? (
                // Profile dropdown (only if logged in)
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 text-white text-lg hover:text-pink-600 transition-colors"
                  >
                    <CgProfile className="text-4xl" />
                    <span>{user?.name}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                      <div className="px-4 py-3 border-b">
                        <p className="text-gray-800 font-bold">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Login button (if not logged in)
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2
                    text-white hover:text-pink-600
                    border border-white hover:border-pink-600
                    py-2 px-4 rounded-full
                    transition-all duration-300 ease-in-out
                    hover:bg-white/10 backdrop-blur-sm"
                >
                  <span>LOGIN</span> <CiLogin className="text-xl" />
                </Link>
              )}
            </div>
          )}
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-pink-600 transition-colors duration-300"
          >
            {isSidebarOpen ? <IoMdClose className="text-4xl" /> : <IoIosMenu className="text-4xl" />}
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96
          bg-gradient-to-br from-gray-900 to-gray-800
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
          z-40 overflow-y-auto`}
      >
        {/* Sidebar Content */}
        <div className="p-8 text-white">
          <nav className="flex flex-col space-y-6 mb-12">
            {[
              { name: "Home", path: "/" },
              { name: "Service", path: "/service" },
              { name: "About Us", path: "/about-us" },
              { name: "Contact", path: "/contact" },
              { name: "My Booking", path: "/my-booking" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  toggleSidebar(); // close sidebar on link click
                  navigate(item.path); // ensure navigation happens
                }}
                className="text-2xl font-bold hover:text-pink-600 transition-all duration-300 ease-in-out transform hover:translate-x-2"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
