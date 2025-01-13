import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className='flex items-center justify-between w-screen h-28 bg-transparent fixed top-0 left-0 z-50'
      >
        {/* Brand Name */}
        {
          isSidebarOpen ? (
            <div></div>
          ) : (
            <div className='pl-12'>
          <p className='font-bold text-3xl text-white'>
            Lake N Hill <span className='text-pink-600'>View</span>
          </p>
        </div>
          )
        }

        {/* Hamburger Menu */}
        <div className='pr-12 cursor-pointer' onClick={toggleSidebar}>
          <IoIosMenu className="text-white text-5xl" />
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-screen bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        {/* Close Button */}
        <div className="p-6 flex justify-end">
          <button onClick={toggleSidebar}>
            <IoMdClose className="text-gray-800 text-4xl" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-6">
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <Link
              onClick={toggleSidebar}
              className="text-lg font-bold hover:text-pink-600 transition"
            >
              Home
            </Link>
            <Link
              to="/hotel"
              className="text-lg font-bold hover:text-pink-600 transition"
            >
              Hotel
            </Link>
            <Link
              to="/about"
              className="text-lg font-bold hover:text-pink-600 transition"
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-lg font-bold hover:text-pink-600 transition"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-lg font-bold hover:text-pink-600 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="mt-10 space-y-2">
            <h3 className="text-sm font-bold text-gray-500">CONTACT INFO</h3>
            <p className="text-sm text-gray-600">
            60, Rope Way, Near Fatehsagar Lake, Beside Jain Temple
            </p>
            <p className="text-sm text-gray-600"> Dewali, Panchwati, Udaipur, 313001 Rajasthan India</p>
            <p className="text-sm text-gray-600">lakenhillview@gmail.com</p>
            <p className="text-sm text-gray-600">(+91) 78787 99889</p>
          </div>

          {/* Social Links */}
          <div className="mt-10 space-y-2">
            <h3 className="text-sm font-bold text-gray-500">
              CONNECT WITH US
            </h3>
            <a
              href="https://twitter.com"
              className="text-sm text-gray-600 hover:underline"
            >
              Twitter
            </a>
            <a
              href="https://www.facebook.com/share/1FS2c8wtut/"
              className="text-sm text-gray-600 hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/lakenhillview?igsh=Ymlpbm9pd2U1bzRn"
              className="text-sm text-gray-600 hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
