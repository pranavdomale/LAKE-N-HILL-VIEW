import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users, Computer, WalletCards, Home, LogOut
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("manage");

  const [rooms, setRooms] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [halls, setHalls] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch data for each section based on the active tab
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "manage") {
          const [roomsRes, bikesRes, hallsRes] = await Promise.all([
            axios.get("http://localhost:5000/rooms"),
            axios.get("http://localhost:5000/bikes"),
            axios.get("http://localhost:5000/halls")
          ]);
          setRooms(roomsRes.data);
          setBikes(bikesRes.data);
          setHalls(hallsRes.data);
          console.log("Details Data (bike):", bikesRes.data);
          console.log("Details Data (room):", roomsRes.data);
          console.log("Details Data (hall):", hallsRes.data);
        } else if (activeTab === "booking") {
          const [resbike, resroom, reshall] = await Promise.all([
            axios.get("http://localhost:5000/bookingsbike"),
            axios.get("http://localhost:5000/bookingsroom"),
            axios.get("http://localhost:5000/bookingshall")
        ]);
        console.log("Bookings Data (bike):", resbike.data);
        console.log("Bookings Data (room):", resroom.data);
        console.log("Bookings Data (hall):", reshall.data);

          setBookings([
            ...(Array.isArray(resbike.data) ? resbike.data : []),
            ...(Array.isArray(resroom.data) ? resroom.data : []),
            ...(Array.isArray(reshall.data) ? reshall.data : [])
        ]);      
        } else if (activeTab === "users") {
          const res = await axios.get("http://localhost:5000/users");
          console.log("User:",res.data);
          setUsers(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [activeTab]);

  const deleteUser = async (email) => {
    if (window.confirm(`Are you sure you want to delete the user with email: ${email}?`)) {
        try {
            await axios.delete(`http://localhost:5000/deleteusers?email=${email}`); // Send email in request body
            alert('User deleted successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    }
};

  const renderTable = (data = [], columns) => (
    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow mb-6">
        {Array.isArray(data) && data.length > 0 ? (
            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
                        {columns.map((col, index) => (
                            <th key={index} className="py-3 px-6 text-left">{col}</th>
                        ))}
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                            <tbody className="text-gray-300 text-sm">
                {data.map((item) => (
                    <tr key={item.id || item.name + item.date} className="border-b border-gray-700 hover:bg-gray-700">
                        {columns.map((col, index) => (
                            <td key={index} className="py-3 px-6 text-left whitespace-nowrap">
                                {col.toLowerCase() === "status" ? (
                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item[col.toLowerCase()])}`}>
                                        {item[col.toLowerCase()]}
                                    </span>
                                ) : (
                                    item[col.toLowerCase()]
                                )}
                            </td>
                        ))}
                        <td className="py-3 px-6 text-center">
                            {/* Hide Edit button when activeTab is 'users' */}
                            {activeTab !== 'users' && (
                                <button className="text-blue-400 hover:text-blue-300 mx-2">Edit</button>
                            )}
                            <button className="text-red-400 hover:text-red-300 mx-2" onClick={() => deleteUser(item.email)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        ) : (
            <p className="text-gray-400 p-4">No data available.</p>
        )}
    </div>
);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "available": return "bg-green-800 text-green-200";
      case "booked":
      case "in use": return "bg-red-800 text-red-200";
      default: return "bg-gray-600 text-gray-200";
    }
  };

  const navItems = [
    { id: "manage", label: "Manage", icon: Computer },
    { id: "booking", label: "Booking", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "payment", label: "Payment", icon: WalletCards },
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
                  className={`flex items-center w-full px-4 py-3 ${activeTab === item.id ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`}
                >
                  <item.icon className="mr-3" size={20} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <button className="flex items-center text-gray-400 hover:text-white" onClick={() => navigate('/')}>
            <LogOut className="mr-3" size={20} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
        {activeTab === "payment" && <p className="text-gray-400">Payment management is under development.</p>}

        {activeTab === "manage" && (
          <>
            <h3 className="text-2xl font-bold mb-4">Rooms</h3>
            {renderTable(rooms, ["Name", "Type", "Capacity", "Price", "Status"])}
            <h3 className="text-2xl font-bold mt-6 mb-4">Bikes</h3>
            {renderTable(bikes, ["Model", "Type", "Available", "Price", "Status"])}
            <h3 className="text-2xl font-bold mt-6 mb-4">Halls</h3>
            {renderTable(halls, ["Name", "Type", "Capacity", "Price", "Status"])}
          </>
        )}
        {activeTab === "booking" && (
          <>
            <h3 className="text-2xl font-bold mb-4">Bookings</h3>
            {renderTable(bookings, ["Name", "Item", "Type", "Date", "PaymentStatus"])}
          </>
        )}
        {activeTab === "users" && (
          <>
            <h3 className="text-2xl font-bold mb-4">Users</h3>
            {renderTable(users, ["Username", "Email", "Role"])}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;