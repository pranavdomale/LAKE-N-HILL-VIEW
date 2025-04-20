import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Users, Computer, Home, LogOut } from "lucide-react";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("manage");

    const [editRow, setEditRow] = useState(null); // Tracks which row is being edited
    const [editData, setEditData] = useState({}); // Stores current editable data
    const [rooms, setRooms] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [halls, setHalls] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (activeTab === "manage") {
                    const [roomsRes, bikesRes, hallsRes] = await Promise.all([
                        axios.get("http://localhost:5000/rooms"),
                        axios.get("http://localhost:5000/bikes"),
                        axios.get("http://localhost:5000/halls")
                    ]);

                    setRooms(roomsRes.data.data.map(room => ({
                        name: room.name,
                        type: room.type,
                        capacity: room.capacity,
                        price: room.price,
                        status: room.status
                    })));

                    setBikes(bikesRes.data.data.map(bike => ({
                        name: bike.name,
                        type: bike.type,
                        price: bike.price,
                        status: bike.status
                    })));

                    setHalls(hallsRes.data.data.map(hall => ({
                        name: hall.name,
                        type: hall.hallType,
                        capacity: hall.capacity,
                        price: hall.price,
                        status: hall.status
                    })));

                } else if (activeTab === "booking") {
                    const [resbike, resroom, reshall] = await Promise.all([
                        axios.get("http://localhost:5000/mybooking-bike"),
                        axios.get("http://localhost:5000/mybooking-room"),
                        axios.get("http://localhost:5000/mybooking-hall")
                    ]);
                    console.log("Room:",resroom.data);
                    console.log("Bike:",resbike.data);
                    console.log("Hall:",reshall.data);

                    const extractBookings = (data, type) => {
                        return data?.data?.flatMap(item =>
                            (item.bookings || []).map(booking => ({
                                ...booking,
                                type,
                                itemName: item.name
                            }))
                        ) || [];
                    };

                    const allBookings = [
                        ...extractBookings(resbike.data, "Bike"),
                        ...extractBookings(resroom.data, "Room"),
                        ...extractBookings(reshall.data, "Hall")
                    ];

                    setBookings(allBookings);

                } else if (activeTab === "users") {
                    const res = await axios.get("http://localhost:5000/users");
                    setUsers(res.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [activeTab]);
    

    const deleteUser = async (email) => {
        if (window.confirm(`Are you sure you want to delete user with email: ${email}?`)) {
            try {
                await axios.delete(`http://localhost:5000/deleteusers?email=${email}`);
                alert('User deleted successfully!');
                setUsers(users.filter(user => user.email !== email));
            } catch (error) {
                alert('Failed to delete user');
            }
        }
    };

    // Add a 'category' argument
  const handleEditClick = (item, category) => {
    console.log("Type:",category);
    setEditRow(item._id || item.name);
    setEditData({ ...item, category }); // use category to know what type it is
  };

  
  const handleEditChange = (field, value) => {
      setEditData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSave = async () => {
    const { category, ...updateData } = editData;  // Use `category` instead of `Type`

    console.log("Category:", category);
    if (!category) {
        alert("Missing category information!");
        return;
    }

    try {
        let url = "";

        switch (category) {
          case "room":
              url = `http://localhost:5000/update-room`;
              break;
          case "bike":
              url = `http://localhost:5000/update-bike`;
              break;
          case "hall":
              url = `http://localhost:5000/update-hall`;
              break;
          case "user":
              url = `http://localhost:5000/update-user`;
              break;
          case "booking":
              if (!editData.type) {
                  alert("Missing booking type (Room, Bike, Hall)!");
                  return;
              }
      
              // Determine which endpoint to use based on item type
              switch (editData.type.toLowerCase()) {
                  case "room":
                      url = `http://localhost:5000/update-room-booking`;
                      break;
                  case "bike":
                      url = `http://localhost:5000/update-bike-booking`;
                      break;
                  case "hall":
                      url = `http://localhost:5000/update-hall-booking`;
                      break;
                  default:
                      alert("Invalid booking type!");
                      return;
              }
              break;
  
          default:
              throw new Error(`Unsupported update type: ${category}`);
      }      

        console.log("Updating:", category, "with data:", updateData); // Debug log to verify

        await axios.put(url, updateData);

        alert(`${category} updated successfully!`);
        setEditRow(null);
        setEditData({});
        window.location.reload(); // Optional, consider using fetchData instead
    } catch (error) {
        console.error("Error updating data:", error);
        alert(`Failed to update ${category}`);
    }
};


  const renderTable = (data = [], columns, Type) => (
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
                    {data.map((item, index) => {
                        // Generate safe unique keys
                        const itemKey = `${Type}-${item._id || item.name || index}`;

                        return (
                            <tr key={itemKey} className="border-b border-gray-700 hover:bg-gray-700">
                                {columns.map((col, index) => {
                                    const field = col.toLowerCase();  // normalize to match item keys
                                  
                                    let Display = item[field];
                                    console.log("Type:",Type,"Item:",item);// default to direct item field value

                                    // Special handling for bookings
                                    if (Type === "booking") {
                                        switch (field) {
                                            case 'type':
                                                Display = item.itemName; // You might already store "room" or "bike" in itemName or similar field
                                                break;
                                    
                                            case 'checkin':
                                                Display = new Date(item.checkIn).toLocaleDateString();
                                                break;
                                    
                                            case 'checkout':
                                                Display = new Date(item.checkOut).toLocaleDateString();
                                                break;
                                    
                                            case 'paymentstatus':
                                                Display = item.paymentStatus;
                                                break;
                                    
                                            case 'name':
                                                // Check if the booking is for a bike (You might have a type field like item.bookingType)
                                                if (item.type === "Bike") {
                                                    Display = item.Name; // You should ensure `Name` is saved in your backend during booking.
                                                } else {
                                                    Display = item.name; // For rooms or other types
                                                }
                                                break;
                                    
                                            default:
                                                Display = item[field] || "N/A";
                                                break;
                                        }
                                    }                                    
                                    
                                    const isEditing = editRow === (item._id || item.name);
                                    return (
                                        <td key={index} className="py-3 px-6 text-left whitespace-nowrap">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editData[field] || ""}
                                                    onChange={(e) => handleEditChange(field, e.target.value)}
                                                    className="bg-gray-700 text-white border border-gray-600 p-1 rounded"
                                                />
                                            ) : (
                                                field === "status" ? (
                                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(Display)}`}>
                                                        {Display}
                                                    </span>
                                                ) : (
                                                    Display
                                                )
                                            )}
                                        </td>
                                    );
                                })}
                                <td className="py-3 px-6 text-center">
                                    {editRow === (item._id || item.name) ? (
                                        <button
                                            className="text-green-400 hover:text-green-300 mx-2"
                                            onClick={() => handleSave(Type, activeTab)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="text-blue-400 hover:text-blue-300 mx-2"
                                                onClick={() => handleEditClick(item, Type)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-400 hover:text-red-300 mx-2"
                                                onClick={() => deleteUser(item.email)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
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
            case "booked": case "in use": return "bg-red-800 text-red-200";
            default: return "bg-gray-600 text-gray-200";
        }
    };

    const navItems = [
        { id: "manage", label: "Manage", icon: Computer },
        { id: "booking", label: "Booking", icon: Home },
        { id: "users", label: "Users", icon: Users }
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
                        {navItems.map(item => (
                            <li key={item.id}>
                                <button onClick={() => setActiveTab(item.id)}
                                    className={`flex items-center w-full px-4 py-3 ${activeTab === item.id ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`}>
                                    <item.icon className="mr-3" size={20} />
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button className="flex items-center p-4 text-gray-400 hover:text-white" onClick={() => navigate('/')}>
                    <LogOut className="mr-3" size={20} /> Logout
                </button>
            </aside>

            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                {activeTab === "manage" && (<>
                  <h3 className="text-2xl font-bold mb-4">Rooms</h3>
                {renderTable(rooms, ["name", "type", "capacity", "price", "status"], "room")}
                <h3 className="text-2xl font-bold mt-6 mb-4">Bikes</h3>
                {renderTable(bikes, ["name", "type", "price", "status"], "bike")}
                <h3 className="text-2xl font-bold mt-6 mb-4">Halls</h3>
                {renderTable(halls, ["name", "Type", "Capacity", "price", "status"], "hall")}
                    </>
                )}

                {activeTab === "booking" && (
                    <>
                    <h3 className="text-2xl font-bold mb-4">Bookings</h3>
                    {renderTable(bookings, ['name','type', 'checkin', 'checkout', 'paymentstatus'], "booking")}
                    </>
                )}

                {activeTab === "users" && (
                <>
                  <h3 className="text-2xl font-bold mb-4">Users</h3>
                  {renderTable(users, ["Username", "Email", "Password","Role"], "user")}
                </>)}

            </main>
        </div>
    );
};

export default AdminDashboard;