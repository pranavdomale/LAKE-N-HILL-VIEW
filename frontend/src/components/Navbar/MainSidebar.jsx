import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        className="fixed top-4 left-4 z-50 text-2xl bg-gray-800 text-white p-2 rounded focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex items-center justify-around w-full mt-20">
          {/* Navigation Links */}
          <div>
          <nav className="flex flex-col space-y-4">
            <a
              href="#home"
              className="text-lg font-bold hover:text-red-500 transition"
              >
              Home
            </a>
            <a
              href="#hotel"
              className="text-lg font-bold hover:text-red-500 transition"
              >
              Hotel
            </a>
            <a
              href="#about"
              className="text-lg font-bold hover:text-red-500 transition"
              >
              About
            </a>
            <a
              href="#blog"
              className="text-lg font-bold hover:text-red-500 transition"
              >
              Blog
            </a>
            <a
              href="#contact"
              className="text-lg font-bold hover:text-red-500 transition"
              >
              Contact
            </a>
          </nav>
        </div>

          {/* Contact Info */}
          <div className="flex items-center justify-around gap-6">
          <div className="mt-10 space-y-2">
            <h3 className="text-sm font-bold text-gray-500">CONTACT INFO</h3>
            <p className="text-sm text-gray-600">
            60, Rope Way, Near Fatehsagar Lake, Beside Jain Temple
            </p>
            <p className="text-sm text-gray-600"> Dewali, Panchwati, Udaipur, 313001 Rajasthan India</p>
            <p className="text-sm text-gray-600">info@yourdomain.com</p>
            <p className="text-sm text-gray-600">(+1) 435 3533</p>
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
              href="https://facebook.com"
              className="text-sm text-gray-600 hover:underline"
              >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              className="text-sm text-gray-600 hover:underline"
              >
              Instagram
            </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
        className="fixed top-4 right-4 z-50 text-2xl bg-gray-800 text-white p-2 rounded focus:outline-none"
        onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
