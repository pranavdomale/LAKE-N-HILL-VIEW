import { useEffect, useState } from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";
import { CalendarDays, MapPin, CheckCircle, Clock, CheckSquare } from "lucide-react";

async function getUserBookings() {
  try {
    const name = localStorage.getItem('Username');
    console.log("Username:", name);

    const response_bike = await Axios.get(`http://localhost:5000/bookingsbike?name=${name}`, { withCredentials: true });
    const response_hall = await Axios.get(`http://localhost:5000/bookingshall?name=${name}`, { withCredentials: true });
    const response_room = await Axios.get(`http://localhost:5000/bookingsroom?name=${name}`, { withCredentials: true });

    console.log("Booking Room:", response_room.data);
    console.log("Booking Bike:", response_bike.data);
    console.log("Booking Hall:", response_hall.data);

    const allBookings = [
      ...response_room.data.data.map(b => ({ ...b, type: 'room' })),
      ...response_bike.data.data.map(b => ({ ...b, type: 'bike' })),
      ...response_hall.data.data.map(b => ({ ...b, type: 'hall' }))
    ];
    console.log("All Bookings:", allBookings);

    return allBookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

export default function MyBookingsPage() {
  const [Bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      const data = await getUserBookings();
      setBookings(data);
      setLoading(false);
    }
    fetchBookings();
  }, []);

  const handleCancel = async (id, type) => {
    try {
      if (!id || !type) {
        console.error("Invalid bookingId or type:", id, type);
        return;
      }
      
      console.log("Type:",type," ID:",id);

      const url = `http://localhost:5000/cancel/${type}/${id}`;
      console.log("Cancelling with URL:", url);
      await Axios.delete(url, { withCredentials: true });  // Optional if your backend uses cookies
      
      // Remove cancelled booking from the list
      setBookings(Bookings.filter(booking => booking._id !== id));
  
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };  

  if (loading) return <p className="text-center text-lg">Loading bookings...</p>;

  return (
    <div className="pt-[75px] container mx-auto py-8 px-4">
      <Navbar />
      <h1 className="pt-[75px] text-3xl font-bold mb-6">My Bookings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Bookings.map((booking, index) => (
          <div key={booking._id || index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{booking.name || 'Booking Details'}</h2>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
            {(booking.type === 'room' || booking.type === 'hall') && (
              <span className="text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {booking._doc.address}
              </span>
            )}
          </div>

            <p className="text-sm text-gray-600 font-medium capitalize mb-2">
              Booking Type: <span className="font-semibold">{booking.propertyName}</span>
            </p>
          
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <CalendarDays className="h-5 w-5" />
              <span className="text-sm">
                {booking._doc.checkIn ? new Date(booking._doc.checkIn).toLocaleDateString() : ''} -
                {booking._doc.checkOut ? new Date(booking._doc.checkOut).toLocaleDateString() : ''}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              {booking.paymentStatus === "confirmed" && <CheckCircle className="h-5 w-5 text-green-500" />}
              {booking.paymentStatus === "pending" && <Clock className="h-5 w-5 text-yellow-500" />}
              {booking.paymentStatus === "completed" && <CheckSquare className="h-5 w-5 text-blue-500" />}
              <span className={`text-sm font-medium capitalize ${
                booking.paymentStatus === "confirmed" ? "text-green-500" :
                booking.paymentStatus === "pending" ? "text-yellow-500" :
                booking.paymentStatus === "completed" ? "text-blue-500" : ""
              }`}>
                {booking.paymentStatus}
              </span>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Price: ₹{booking?.$__parent?.price}
            </p>
            {(booking.type === 'room' || booking.type === 'hall') && (
            <p className="text-sm text-gray-600 font-medium">
              {booking.type === 'room' ? 'Guests' : 'Capacity'} : {booking._doc.guestCount} {booking._doc.Capacity}
            </p>
            )}
            {booking.type === 'bike' && (
              <p className="text-sm text-gray-600 font-medium">
                Rental vehicle: {booking.propertyName}
              </p>
            )}
            <button 
              onClick={() => handleCancel(booking._doc?._id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600">
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
