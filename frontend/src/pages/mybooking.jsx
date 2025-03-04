import { useEffect, useState } from "react";
import  Axios  from "axios";
import Navbar from "../components/Navbar";
import { CalendarDays, MapPin, CheckCircle, Clock, CheckSquare } from "lucide-react"

async function getUserBookings() {
  try {
    const response = await Axios.get("http://localhost:5000/bookings", { 
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log("My booking response:",response)

    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return []; // Return an empty array to prevent crashes
  }
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      const data = await getUserBookings();
      setBookings(data);
      setLoading(false);
    }
    fetchBookings();
  }, [])

  if (loading) return <p className="text-center text-lg">Loading bookings...</p>

  return (
    <div className="pt-[75px] container mx-auto py-8 px-4">
      <Navbar/>
      <h1 className="pt-[75px] text-3xl font-bold mb-6">My Bookings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{booking.propertyName}</h2>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{booking.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <CalendarDays className="h-5 w-5" />
              <span className="text-sm">
                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {booking.status === "confirmed" && <CheckCircle className="h-5 w-5 text-green-500" />}
              {booking.status === "pending" && <Clock className="h-5 w-5 text-yellow-500" />}
              {booking.status === "completed" && <CheckSquare className="h-5 w-5 text-blue-500" />}
              <span
                className={`text-sm font-medium capitalize
                ${booking.status === "confirmed" ? "text-green-500" : ""}
                ${booking.status === "pending" ? "text-yellow-500" : ""}
                ${booking.status === "completed" ? "text-blue-500" : ""}
              `}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { CalendarDays, MapPin, CheckCircle, Clock, CheckSquare, User } from "lucide-react";

// async function getUserBookings() {
//   try {
//     const response = await axios.get("http://localhost:5000/bookings", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     return [];
//   }
// }

// async function getUserInfo() {
//   try {
//     const response = await axios.get("http://localhost:5000/checkLogin", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user info:", error);
//     return null;
//   }
// }

// export default function MyBookingsPage() {
//   const [bookings, setBookings] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       const [bookingsData, userData] = await Promise.all([getUserBookings(), getUserInfo()]);
//       setBookings(bookingsData);
//       setUser(userData);
//       setLoading(false);
//     }

//     fetchData();
//   }, []);

//   if (loading) return <p className="text-center text-lg">Loading data...</p>;

//   return (
//     <div className="container mx-auto py-8 px-4">
//       {user && (
//         <div className="bg-gray-100 p-4 rounded-lg mb-6 flex items-center gap-4">
//           <User className="h-10 w-10 text-gray-600" />
//           <div>
//             <p className="text-lg font-bold">{user.name}</p>
//             <p className="text-gray-600">{user.email}</p>
//           </div>
//         </div>
//       )}

//       <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {bookings.map((booking) => (
//           <div key={booking.id} className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-2">{booking.propertyName}</h2>
//             <div className="flex items-center gap-2 text-gray-600 mb-4">
//               <MapPin className="h-4 w-4" />
//               <span className="text-sm">{booking.location}</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-600 mb-4">
//               <CalendarDays className="h-5 w-5" />
//               <span className="text-sm">
//                 {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               {booking.status === "confirmed" && <CheckCircle className="h-5 w-5 text-green-500" />}
//               {booking.status === "pending" && <Clock className="h-5 w-5 text-yellow-500" />}
//               {booking.status === "completed" && <CheckSquare className="h-5 w-5 text-blue-500" />}
//               <span
//                 className={`text-sm font-medium capitalize ${
//                   booking.status === "confirmed" ? "text-green-500" : ""
//                 } ${booking.status === "pending" ? "text-yellow-500" : ""} ${
//                   booking.status === "completed" ? "text-blue-500" : ""
//                 }`}
//               >
//                 {booking.status}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
