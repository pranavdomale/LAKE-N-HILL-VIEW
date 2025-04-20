import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Star , Calendar ,Maximize, Wind } from "lucide-react"; //,Calendar, Users
import hallImage1 from "../assets/hall-01.jpg";
import hallImage2 from "../assets/hall-02.jpg";
import hallImage3 from "../assets/hall-03.jpg";

const hallTypes = {
    "Conference Hall": { price: 5000, discount: 10},
    "Banquet Hall": { price: 8000, discount: 10},
    "Wedding Hall": { price: 15000, discount: 10 },
  };

const hall = {
  id: 1,
  name: "Premium Hall",
  description: "Host your next event in a spacious and elegant hall designed to accommodate any occasion. With top-of-the-line facilities, modern amenities, and a sophisticated ambiance, our halls offer the perfect setting for an unforgettable experience. Whether you're planning a wedding, corporate event, or a special celebration, renting a premium hall ensures your guests will enjoy comfort, style, and a memorable atmosphere.",
  price: 500, // Adjust price per day
  originalPrice: 700,
  Capacity: 300,
  rating: 4,
  features: ["Wi-Fi", "Parking", "Air Conditioning", "Sound System", "Projector and Screen", "Catering Services"],  
  images: [hallImage1, hallImage2, hallImage3],
};

const HallBookPage = () => {
    const navigate = useNavigate();
    const [guestName, setguestName] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [checkIn, setcheckIn] = useState('');
    const [checkOut, setcheckOut] = useState('');
    const [hallType, sethallType] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [address, setAddress] = useState('');
    const [Capacity, setCapacity] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);
  
    const handleHallTypeChange = (e) => {
      const selectedType = e.target.value;
      sethallType(selectedType);
      if (hallTypes[selectedType]) {
        setPrice(hallTypes[selectedType].price);
        setDiscount(hallTypes[selectedType].discount);
      } else {
        setPrice(0);
        setDiscount(0);
      }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const bookingInfo = { name: guestName, phoneno, address, checkIn, checkOut, hallType, Capacity: Number(Capacity) };
      const info = { checkIn, Capacity, hallType };
    
      console.log("Booking info array:", bookingInfo);
    
      if (!hallType) {
        alert("Please select a hall type.");
        return;
      }
    
      try {
        // Check availability
        const availabilityResponse = await axios.post("http://localhost:5000/availability_hall", info, {
          headers: { "Content-Type": "application/json" },
        });
    
        console.log("Availability Response:", availabilityResponse);
    
        if (availabilityResponse.data.message !== "Hall is available") {
          alert("Hall is not available for the selected dates.");
          return;
        }        
    
        // Book hall
        const bookingResponse = await axios.post("http://localhost:5000/book_hall", bookingInfo, {
            withCredentials: true
          });
    
        console.log("Booking info:", bookingInfo);
        console.log("Booking Response:", bookingResponse);
    
        if (bookingResponse.status === 200) {
          navigate("/payment");
        }
      } catch (error) {
        console.error("Error Response:", error.response?.data || error.message);
        alert(
          "Error: " +
            (error.response?.data?.message || "Unable to process your booking request. Please try again later.")
        );
      }
    };
    
  
    return (
      <div className="pt-[80px] flex flex-col lg:flex-row min-h-screen bg-gray-100">
        <Navbar/>
        {/* Main Content */}
        <div className="lg:w-2/3 bg-white overflow-y-auto">
          {/* Image Carousel */}
          <div className="relative h-96">
            <img
              src={hall.images[currentImage] || "/placeholder.svg"}
              alt={`${hall.name} - View ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {hall.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full ${currentImage === index ? "bg-white" : "bg-gray-400"}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
  
          {/* Bike Details */}
          <div className="p-6 lg:p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{hall.name}</h1>
            <div className="flex items-center mb-4">
              {[...Array(hall.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600">({hall.rating} stars)</span>
            </div>
            <p className="text-gray-600 mb-6">{hall.description}</p>
  
            {/* Bike Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hall Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Maximize className="w-5 h-5 text-gray-500 mr-2" />
                  <span>
                    <strong>Capacity:</strong> {hall.Capacity} persons
                  </span>
                </div>
                <div className="flex items-center">
                  <Wind className="w-5 h-5 text-gray-500 mr-2" />
                  <span>
                    <strong>Features:</strong> {hall.features.join(", ")}
                  </span>
                </div>
              </div>
            </div>
  
          </div>
        </div>
  
        {/* Booking Sidebar */}
        <div className="lg:w-1/3 p-6 lg:p-10 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book Your Hall</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setguestName(e.target.value)}
                  className="w-full pl-4 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
  
              <div>
                <label htmlFor="phoneno" className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneno"
                  value={phoneno}
                  onChange={(e) => setPhoneno(e.target.value)}
                  pattern="[0-9]{10}"
                  className="w-full pl-4 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
  
              <div>
                <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="4"
                  className="w-full pl-4 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
  
              <div>
              <label htmlFor="returnDate" className="block text-gray-700 font-semibold mb-2">
                  Rental Date
                </label>
                <div className="relative">
                <Calendar className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
                <input
                  type="date"
                  id="checkIn"
                  value={checkIn}
                  onChange={(e) => setcheckIn(e.target.value)}
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              </div>

              <div>
              <label htmlFor="returnDate" className="block text-gray-700 font-semibold mb-2">
                  Return Date
                </label>
                <div className="relative">
                <Calendar className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
                <input
                  type="date"
                  id="checkOut"
                  value={checkOut}
                  onChange={(e) => setcheckOut(e.target.value)}
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
  
              <div>
                <label htmlFor="guestCount" className="block text-gray-700 font-semibold mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="Capacity"
                  value={Capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  min="100"
                  max={hall.Capacity}
                  className="w-full pl-4 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
  
              <div>
    <label htmlFor="hallType" className="block text-gray-700 font-semibold mb-2">
      Hall Type
    </label>
    <div className="relative">
       <select
        id="hallType"
        value={hallType}
        onChange={handleHallTypeChange}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        required
      >
        <option value="">Select a Hall type</option>
          {Object.keys(hallTypes).map((hallType) => (
          <option key={hallType} value={hallType}>
          {hallType}
          </option>
          ))}
      </select>
    </div>
  </div>

  {hallType && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-lg font-semibold">
                  Price: ₹{price} <span className="line-through text-gray-500 text-sm">₹{Math.round(price / (1 - discount / 100))}</span>
                </p>
                <p className="text-green-600">Discount: {discount}%</p>
              </div>
            )}
  
              <button
                type="submit"
                className="w-full bg-pink-500 text-white font-bold py-2 rounded-lg hover:bg-pink-600 transition duration-300"
              >
                Confirm Booking
              </button>
            
          </div>
          </form>
        </div>
      </div>
      </div>
    );
  };
  
  export default HallBookPage;