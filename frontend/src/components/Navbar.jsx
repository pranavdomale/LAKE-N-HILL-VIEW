import React, { useState } from "react"
import { Link } from "react-router-dom"
import { IoIosMenu } from "react-icons/io"
import { IoMdClose } from "react-icons/io"
import { CiLogin } from "react-icons/ci"
import { CgProfile } from "react-icons/cg"

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isLoggedIn = false

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div>
      {/* Navbar */}
      <nav
        className={`
        flex items-center justify-between w-full h-20 
        fixed top-0 left-0 z-50 px-4 md:px-12
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "bg-transparent" : "bg-black/30 backdrop-blur-md"}
      `}
      >
        {/* Brand Name */}
        <div
          className={`
          transition-opacity duration-300 ease-in-out
          ${isSidebarOpen ? "opacity-0" : "opacity-100"}
        `}
        >
          <p className="font-bold text-2xl md:text-3xl text-white">
            Lake N Hill <span className="text-pink-600">View</span>
          </p>
        </div>

        {/* Login/Profile and Menu */}
        <div className="flex items-center space-x-4">
          {!isSidebarOpen && (
            <div className="transition-opacity duration-300 ease-in-out">
              {isLoggedIn ? (
                <div className="text-white text-4xl hover:text-pink-600 transition-colors">
                  <CgProfile />
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
          <button onClick={toggleSidebar} className="text-white hover:text-pink-600 transition-colors duration-300">
            {isSidebarOpen ? <IoMdClose className="text-4xl" /> : <IoIosMenu className="text-4xl" />}
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 right-0 h-full w-full md:w-96
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
              { name: "Hotel", path: "/hotel" },
              { name: "About Us", path: "/about-us" },
              { name: "Contact", path: "/contact" },
              { name: "My Booking", path: "/my-booking" },
             
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={toggleSidebar}
                className="
                  text-2xl font-bold hover:text-pink-600 
                  transition-all duration-300 ease-in-out
                  transform hover:translate-x-2
                "
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
                  className="
                    text-sm text-gray-300 hover:text-white
                    transition-colors duration-300 ease-in-out
                  "
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
  )
}

export default Navbar

