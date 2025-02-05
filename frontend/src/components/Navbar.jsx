
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { IoIosMenu } from "react-icons/io";
// import { IoMdClose } from "react-icons/io";
// import { CiLogin } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";

// const Navbar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [checkLogin, setCheckLogin] = useState(false); // Default: false (not logged in)
//   const [user, setUser] = useState(null); // Dynamically set user information
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/login", {
//           credentials: "include",
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setUser(data);
//           setCheckLogin(true); // User is logged in
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

//   const handleLogout = () => {
//     setUser(null);
//     setCheckLogin(false);
//     alert("Logged out successfully.");
//     navigate("/"); // Redirect to homepage after logout
//   };  

//   return (
//     <div>
//       {/* Navbar */}
//       <nav>
//         className={`flex items-center justify-between w-full h-20 
//         fixed top-0 left-0 z-50 px-4 md:px-12
//         transition-all duration-300 ease-in-out
//         ${isSidebarOpen ? "bg-transparent" : "bg-black/30 backdrop-blur-md"}
//       `}
//       >
//         {/* Brand Name */}
//         <div
//           className={`transition-opacity duration-300 ease-in-out
//           ${isSidebarOpen ? "opacity-0" : "opacity-100"}
//         `}
//         >
//           <p className="font-bold text-2xl md:text-3xl text-white" onClick={() => navigate("/")}>
//             Lake N Hill <span className="text-pink-600">View</span>
//           </p>
//         </div>

//         {/* Login/Profile and Menu */}
//         {checkLogin ? (
//   <div className="relative">
//     <button
//       onClick={() => setDropdownOpen(!dropdownOpen)}
//       className="flex items-center gap-2 text-white text-lg hover:text-pink-600 transition-colors"
//     >
//       <CgProfile className="text-4xl" />
//       <span>{user?.name}</span>
//     </button>
//     {dropdownOpen && (
//       <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
//         <button
//           onClick={handleLogout}
//           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
//         >
//           Logout
//         </button>
//       </div>
//     )}
//   </div>
// ) : (
//   <Link
//     to="/login"
//     className="
//       flex items-center justify-center gap-2
//       text-white hover:text-pink-600
//       border border-white hover:border-pink-600
//       py-2 px-4 rounded-full
//       transition-all duration-300 ease-in-out
//       hover:bg-white/10 backdrop-blur-sm
//     "
//   >
//     <span>LOGIN</span> <CiLogin className="text-xl" />
//   </Link>
// )}
//             </div>
//           )}
//           <button onClick={toggleSidebar} className="text-white hover:text-pink-600 transition-colors duration-300">
//             {isSidebarOpen ? <IoMdClose className="text-4xl" /> : <IoIosMenu className="text-4xl" />}
//           </button>
//         </div>
//         </div>
//       </nav>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full w-full md:w-96
//         bg-gradient-to-br from-gray-900 to-gray-800
//         transform transition-transform duration-300 ease-in-out
//         ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
//         z-40 overflow-y-auto`}>
//         {/* Sidebar Content */}
//         <div className="p-8 text-white">
//           {/* Navigation Links */}
//           <nav className="flex flex-col space-y-6 mb-12">
//             {[{ name: "Home", path: "/" }, { name: "Service", path: "/service" }, { name: "About Us", path: "/about-us" }, { name: "Contact", path: "/contact" }, { name: "My Booking", path: "/my-booking" }].map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 onClick={toggleSidebar}
//                 className="text-2xl font-bold hover:text-pink-600 
//                 transition-all duration-300 ease-in-out
//                 transform hover:translate-x-2"
//               >
//                 {item.name}
//               </Link>
//             ))}
         

//           {/* Contact Info */}
//           <div className="mb-12 space-y-4">
//             <h3 className="text-lg font-bold text-pink-600">CONTACT INFO</h3>
//             <p className="text-sm text-gray-300">
//               60, Rope Way, Near Fatehsagar Lake, Beside Jain Temple
//               <br />
//               Dewali, Panchwati, Udaipur, 313001 Rajasthan India
//             </p>
//             <p className="text-sm text-gray-300">lakenhillview@gmail.com</p>
//             <p className="text-sm text-gray-300">(+91) 78787 99889</p>
//           </div>

//           {/* Social Links */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-bold text-pink-600">CONNECT WITH US</h3>
//             <div className="flex space-x-4">
//               {[{ name: "Twitter", url: "https://twitter.com" }, { name: "Facebook", url: "https://www.facebook.com/share/1FS2c8wtut/" }, { name: "Instagram", url: "https://www.instagram.com/lakenhillview?igsh=Ymlpbm9pd2U1bzRn" }].map((social) => (
//                 <a
//                   key={social.name}
//                   href={social.url}
//                   className="text-sm text-gray-300 hover:text-white
//                   transition-colors duration-300 ease-in-out"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {social.name}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//      </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/login", {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setCheckLogin(true);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setCheckLogin(false);
      }
    };

    fetchUser();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setUser(null);
    setCheckLogin(false);
    alert("Logged out successfully.");
    navigate("/");
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className={`flex items-center justify-between w-full h-20 
        fixed top-0 left-0 z-50 px-4 md:px-12
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "bg-transparent" : "bg-black/30 backdrop-blur-md"}
      `}
      >
        {/* Brand Name */}
        <div
          className={`transition-opacity duration-300 ease-in-out
          ${isSidebarOpen ? "opacity-0" : "opacity-100"}
        `}
        >
          <p
            className="font-bold text-2xl md:text-3xl text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            Lake N Hill <span className="text-pink-600">View</span>
          </p>
        </div>

        {/* Login/Profile and Menu */}
        <div className="flex items-center space-x-4 relative">
          {!isSidebarOpen && (
            <div className="transition-opacity duration-300 ease-in-out">
              {checkLogin ? (
                <div className="relative" onBlur={() => setDropdownOpen(false)} tabIndex={0}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 text-white text-lg hover:text-pink-600 transition-colors"
                  >
                    <CgProfile className="text-4xl" />
                    <span>{user?.name}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
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
                <Link
                  to="/login"
                  className="
                  flex items-center justify-center gap-2
                  text-white hover:text-pink-600
                  border border-white hover:border-pink-600
                  py-2 px-4 rounded-full
                  transition-all duration-300 ease-in-out
                  hover:bg-white/10 backdrop-blur-sm
                "
                >
                  <span>LOGIN</span> <CiLogin className="text-xl" />
                </Link>
              )}
            </div>
          )}
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
        z-40 overflow-y-auto
      `}
      >
        {/* Sidebar Content */}
        <div className="p-8 text-white">
          {/* Navigation Links */}
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
                onClick={toggleSidebar}
                className="text-2xl font-bold hover:text-pink-600 
                transition-all duration-300 ease-in-out
                transform hover:translate-x-2"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="mb-12 space-y-4">
            <h3 className="text-lg font-bold text-pink-600">CONTACT INFO</h3>
            <p className="text-sm text-gray-300">
              60, Rope Way, Near Fatehsagar Lake, Beside Jain Temple
              <br />
              Dewali, Panchwati, Udaipur, 313001 Rajasthan India
            </p>
            <p className="text-sm text-gray-300">lakenhillview@gmail.com</p>
            <p className="text-sm text-gray-300">(+91) 78787 99889</p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-pink-600">CONNECT WITH US</h3>
            <div className="flex space-x-4">
              {[
                { name: "Twitter", url: "https://twitter.com" },
                { name: "Facebook", url: "https://www.facebook.com/share/1FS2c8wtut/" },
                { name: "Instagram", url: "https://www.instagram.com/lakenhillview?igsh=Ymlpbm9pd2U1bzRn" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-sm text-gray-300 hover:text-white
                  transition-colors duration-300 ease-in-out"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
