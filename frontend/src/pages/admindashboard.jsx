// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import {
//   Users,
//   Computer,
//   WalletCards,
//   Home,
//   LogOut,
//   Menu,
//   X,
//   Search,
//   Plus,
// } from "lucide-react"

// // CreditCard, Calendar, Settings, ChevronDown
// // Mock data for demonstration
// const roomsData = [
//   { id: 1, name: "Single Room", type: "Suite", capacity: 1, price: 950, status: "Available" },
//   { id: 2, name: "Deluxe Room", type: "Deluxe", capacity: 2, price: 2000, status: "Available" },
//   { id: 3, name: "Super Deluxe Room", type: "Suite", capacity: 2, price: 3000, status: "Available" },
//   { id: 4, name: "Luxury Room", type: "Executive", capacity: 4, price: 5000, status: "Available" },
// ]

// const bikesData = [
//   { id: 1, model: "Activa 5G", type: "Mountain", available: 5, Price: 700, status: "Available" },
//   { id: 2, model: "Royal Enfeild Bullet", type: "City", available: 3, Price: 2000, status: "Availablee" },
//   { id: 3, model: "Passion Pro", type: "Electric", available: 2, Price: 1200, status: "Available" },
// ]

// const hallsData = [
//   { id: 1, name: "Banquet Hall", type: "Ballroom", capacity: 200, Price: 5000,status: "Available" },
//   { id: 3, name: "Conference Hall", type: "Wedding", capacity: 100, Price: 8000,status: "Available" },
//   { id: 5, name: "Wedding Hall", type: "Reception", capacity: 500, Price: 15000,status: "Available" },
// ]

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("manage")
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const renderTable = (data, columns) => (
//     <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
//       <table className="min-w-full">
//         <thead>
//           <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
//             {columns.map((column, index) => (
//               <th key={index} className="py-3 px-6 text-left">
//                 {column}
//               </th>
//             ))}
//             <th className="py-3 px-6 text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-300 text-sm">
//           {data.map((item) => (
//             <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700">
//               {columns.map((column, index) => (
//                 <td key={index} className="py-3 px-6 text-left whitespace-nowrap">
//                   {column.toLowerCase() === "status" ? (
//                     <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item[column.toLowerCase()])}`}>
//                       {item[column.toLowerCase()]}
//                     </span>
//                   ) : (
//                     item[column.toLowerCase()]
//                   )}
//                 </td>
//               ))}
//               <td className="py-3 px-6 text-center">
//                 <div className="flex item-center justify-center">
//                   <button className="text-blue-400 hover:text-blue-300 mx-2">Edit</button>
//                   <button className="text-red-400 hover:text-red-300 mx-2">Delete</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "available":
//         return "bg-green-800 text-green-200"
//       case "occupied":
//       case "booked":
//       case "in use":
//         return "bg-red-800 text-red-200"
//       case "maintenance":
//       case "setup":
//         return "bg-yellow-800 text-yellow-200"
//       default:
//         return "bg-gray-600 text-gray-200"
//     }
//   }

//   const navItems = [
//     { id: "manage", label: "Manage", icon: Computer },
//     { id: "booking", label: "Booking", icon: Home },
//     { id: "users", label: "Users", icon: Users },
//     { id: "payment", label: "Payment", icon: WalletCards },
//   ]

//   return (
//     <div className="flex h-screen bg-gray-900 text-gray-100">
//       {/* Sidebar */}
//       <aside className="bg-gray-800 w-64 hidden md:flex flex-col">
//         <div className="p-4 bg-gray-900">
//           <h1 className="text-2xl font-semibold text-blue-400">Luxury Resort</h1>
//           <p className="text-sm text-gray-400">Admin Dashboard</p>
//         </div>
//         <nav className="flex-1">
//           <ul className="mt-6 space-y-2">
//             {navItems.map((item) => (
//               <li key={item.id}>
//                 <button
//                   onClick={() => setActiveTab(item.id)}
//                   className={`flex items-center w-full px-4 py-3 transition-colors duration-200 ${
//                     activeTab === item.id
//                       ? "bg-blue-600 text-white"
//                       : "text-gray-400 hover:bg-gray-700 hover:text-white"
//                   }`}
//                 >
//                   <item.icon className="mr-3" size={20} />
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className="p-4">
//           <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200" onClick={()=> navigate('/')}>
//             <LogOut className="mr-3" size={20} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Mobile menu button */}
//       <div className="md:hidden fixed top-0 left-0 z-20 m-4">
//         <button
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
//           aria-label="Toggle menu"
//         >
//           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-90 md:hidden">
//           <div className="flex flex-col h-full p-4">
//             <div className="flex justify-between items-center mb-8">
//               <h1 className="text-2xl font-semibold text-blue-400">Lake N Hill View</h1>
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="text-gray-300 hover:text-white"
//                 aria-label="Close menu"
//               >
//                 <X size={24} />
//               </button>
//             </div>
//             <nav>
//               <ul className="space-y-4">
//                 {navItems.map((item) => (
//                   <li key={item.id}>
//                     <button
//                       onClick={() => {
//                         setActiveTab(item.id)
//                         setIsMobileMenuOpen(false)
//                       }}
//                       className="flex items-center w-full text-gray-300 hover:text-white py-2"
//                     >
//                       <item.icon className="mr-3" size={20} />
//                       {item.label}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>
//         </div>
//       )}

//       {/* Main content */}
//       <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
//         <div className="container mx-auto px-6 py-8">
//           <h3 className="text-3xl font-medium text-gray-200 mb-6">
//             {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
//           </h3>
//           <div className="mb-8 flex justify-between items-center">
//             <div className="flex-1 pr-4">
//               <div className="relative md:w-1/3">
//                 <input
//                   type="search"
//                   className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Search..."
//                 />
//                 <div className="absolute top-0 left-0 inline-flex items-center p-2">
//                   <Search className="w-6 h-6 text-gray-400" />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800 flex items-center">
//                 <Plus className="mr-2" size={20} />
//                 Add New {activeTab.slice(0, -1)}
//               </button>
//             </div>
//           </div>
//           {activeTab === "rooms" && renderTable(roomsData, ["Name", "Type", "Capacity", "Price", "Status"])}
//           {activeTab === "bikes" && renderTable(bikesData, ["Model", "Type", "Available", "HourlyRate", "Status"])}
//           {activeTab === "halls" && renderTable(hallsData, ["Name", "Type", "Capacity", "HourlyRate", "Status"])}
//           {(activeTab === "bookings" || activeTab === "payments" || activeTab === "settings") && (
//             <div className="bg-gray-800 p-6 rounded-lg shadow">
//               <p className="text-gray-300">This section is under development. Please check back later.</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }

// export default AdminDashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Computer, WalletCards, Home, LogOut
} from "lucide-react";

// Mock Data
const roomsData = [
  { id: 1, name: "Single Room", type: "Suite", capacity: 1, price: 950, status: "Available" },
  { id: 2, name: "Deluxe Room", type: "Deluxe", capacity: 2, price: 2000, status: "Available" },
];

const bikesData = [
  { id: 1, model: "Activa 5G", type: "Scooter", available: 5, price: 700, status: "Available" },
  { id: 2, model: "Royal Enfield Bullet", type: "Cruiser", available: 3, price: 2000, status: "Available" },
];

const hallsData = [
  { id: 1, name: "Banquet Hall", type: "Ballroom", capacity: 200, price: 5000, status: "Available" },
];

const bookingsData = [
  { id: 1, user: "John Doe", item: "Single Room", type: "Room", date: "2025-02-20", status: "Booked" },
  { id: 2, user: "Jane Smith", item: "Activa 5G", type: "Bike", date: "2025-02-22", status: "In Use" },
];

const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Customer" },
  { id: 2, name: "Admin User", email: "admin@example.com", role: "Admin" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("manage");

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-green-800 text-green-200";
      case "booked":
      case "in use":
        return "bg-red-800 text-red-200";
      default:
        return "bg-gray-600 text-gray-200";
    }
  };

  const renderTable = (data, columns) => (
    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow mb-6">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
            {columns.map((column, index) => (
              <th key={index} className="py-3 px-6 text-left">{column}</th>
            ))}
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-sm">
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700">
              {columns.map((column, index) => (
                <td key={index} className="py-3 px-6 text-left whitespace-nowrap">
                  {column.toLowerCase() === "status" ? (
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item[column.toLowerCase()])}`}>
                      {item[column.toLowerCase()]}
                    </span>
                  ) : (
                    item[column.toLowerCase()]
                  )}
                </td>
              ))}
              <td className="py-3 px-6 text-center">
                <button className="text-blue-400 hover:text-blue-300 mx-2">Edit</button>
                <button className="text-red-400 hover:text-red-300 mx-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const navItems = [
    { id: "manage", label: "Manage", icon: Computer },
    { id: "booking", label: "Bookings", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "payment", label: "Payments", icon: WalletCards },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside className="bg-gray-800 w-64 hidden md:flex flex-col">
        <div className="p-4 bg-gray-900">
          <h1 className="text-2xl font-semibold text-blue-400">Lake N Hill View</h1>
          <p className="text-sm text-gray-400">Admin Dashboard</p>
        </div>
        <nav className="flex-1">
          <ul className="mt-6 space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-4 py-3 ${
                    activeTab === item.id ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon className="mr-3" size={20} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <button className="flex items-center text-gray-400 hover:text-white" onClick={() => navigate("/")}>
            <LogOut className="mr-3" size={20} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-4">
      <h2 className="text-3xl font-semibold text-gray-200">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h2>
      <button
        onClick={() => {/* Add logic to open modal or navigate to add page */}}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Add
      </button>
      </div>


        {activeTab === "manage" && (
          <>
            {renderTable(roomsData, ["Name", "Type", "Capacity", "Price", "Status"])}
            {renderTable(bikesData, ["Model", "Type", "Available", "Price", "Status"])}
            {renderTable(hallsData, ["Name", "Type", "Capacity", "Price", "Status"])}
          </>
        )}

        {activeTab === "booking" && renderTable(bookingsData, ["User", "Item", "Type", "Date", "Status"])}

        {activeTab === "users" && renderTable(usersData, ["Name", "Email", "Role"])}

        {activeTab === "payment" && (
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-300">Payment management section under development.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
