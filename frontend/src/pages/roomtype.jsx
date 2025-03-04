import React, { useState } from "react";
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, Users, Calendar, Maximize, BedDouble, ShowerHead, Wind, Utensils } from "lucide-react"
import single_image1 from "../assets/single-room-01.jpg"
import delux_image1 from "../assets/Delux Room.jpg"
import super_image1 from "../assets/Super Delux Room-images-0.jpg"
import luximage from "../assets/Luxury Room_page-0001.jpg";

const roomTypes = {
  "Single Room": { price: 900, discount: 10},
  "Deluxe Room": { price: 2000, discount: 10},
  "Super Deluxe Room": { price: 3000, discount: 10 },
  "Luxury Suite": { price: 5000, discount: 10 },
};

const room = {
  name: "Premium Rooms",
  description:
    "Premium suite with all luxury amenities, offering an exquisite blend of comfort and sophistication. Enjoy a spacious, elegantly designed interior with top-tier furnishings and modern conveniences. Indulge in a private balcony with breathtaking views, a luxurious Jacuzzi, and personalized room service for a truly unforgettable stay.",
  capacity: 3,
  rating: 5,
  size: "30 m²", // in square meters
  bedType: "King Size",
  view: "Ocean View",
  amenities: [
    "All Meals",
    "Jacuzzi",
    "City View",
    "Private Balcony",
    "Room Service",
    "Flat-screen TV",
    "Free WiFi",
    "Air Conditioning",
    "In-room Safe",
  ],
  images: [luximage, single_image1, delux_image1, super_image1],
  }

const BookPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [address, setAddress] = useState('');
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [Type, setType] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [guestCount, setguestCount] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const handleRoomTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    if (roomTypes[selectedType]) {
      setPrice(roomTypes[selectedType].price);
      setDiscount(roomTypes[selectedType].discount);
    } else {
      setPrice(0);
      setDiscount(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit Function");

    if (!Type) {
        alert("Please select a room type.");
        return;
    }

    // Validate check-in and check-out dates
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    if (checkIn < currentDate || checkOut <= checkIn) {
        alert("Invalid date selection. Please select valid future dates.");
        return;
    }

    const info = { checkIn, checkOut, Type };
    const bookinfo = { name, phoneno, address, checkIn, checkOut, guestCount, Type };

    try {
        console.log("Checking availability...");
        const availabilityResponse = await axios.post("http://localhost:5000/availability_room", info, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("Availability Response:", availabilityResponse.data);

        if (!availabilityResponse.data.success) {
            alert("Room is not available for the selected dates.");
            return;
        }

        console.log("Attempting to book room...");
        const bookingResponse = await axios.post("http://localhost:5000/book_room", bookinfo, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("Booking Response:", bookingResponse.data);

        if (bookingResponse.status === 200) {
            console.log("Booking Successful");
            navigate('/payment');
        }
    } catch (error) {
        console.error("Error Response:", error.response?.data || error.message);
        alert("Error: " + (error.response?.data?.message || "Unknown error"));
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
          src={room.images[currentImage] || "/placeholder.svg"}
          alt={`${room.name} - View ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {room.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full ${currentImage === index ? "bg-white" : "bg-gray-400"}`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Room Details */}
      <div className="p-6 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{room.name}</h1>
        <div className="flex items-center mb-4">
          {[...Array(room.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 text-gray-600">({room.rating} stars)</span>
        </div>
        <p className="text-gray-600 mb-6">{room.description}</p>

        {/* Room Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Room Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Maximize className="w-5 h-5 text-gray-500 mr-2" />
              <span>
                <strong>Size:</strong> {room.size}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-500 mr-2" />
              <span>
                <strong>Capacity:</strong> Up to {room.capacity} guestCount
              </span>
            </div>
            <div className="flex items-center">
              <BedDouble className="w-5 h-5 text-gray-500 mr-2" />
              <span>
                <strong>Bed:</strong> {room.bedType}
              </span>
            </div>
            <div className="flex items-center">
              <ShowerHead className="w-5 h-5 text-gray-500 mr-2" />
              <span>
                <strong>Bathroom:</strong> Private ensuite
              </span>
            </div>
            <div className="flex items-center">
              <Wind className="w-5 h-5 text-gray-500 mr-2" />
              <span>
                <strong>View:</strong> {room.view}
              </span>
            </div>
            <div className="flex items-center">
              <Utensils className="w-5 h-5 text-gray-500 mr-2" />
              <span>
                <strong>Dining:</strong> Room service available
              </span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Amenities</h2>
        <ul className="grid grid-cols-2 gap-2 mb-6">
          {room.amenities.map((amenity, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
              {amenity}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Booking Sidebar */}
    <div className="lg:w-1/3 p-6 lg:p-10 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book Your Stay</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
      Name
    </label>
    <input
      type="text"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
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
  <label htmlFor="checkIn" className="block text-gray-700 font-semibold mb-2">
    Check-in Date
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
  <label htmlFor="checkOut" className="block text-gray-700 font-semibold mb-2">
    Check-out Date
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
</div>

  <div>
    <label htmlFor="guestCount" className="block text-gray-700 font-semibold mb-2">
      Number of guestCount
    </label>
    <div className="relative">
      <Users className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
      <input
        type="number"
        id="guestCount"
        value={guestCount}
        onChange={(e) => setguestCount(e.target.value)}
        min="1"
        max={room.capacity}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        required
      />
    </div>
  </div>

  {/* New Room Type Dropdown */}
  <div>
    <label htmlFor="roomType" className="block text-gray-700 font-semibold mb-2">
      Room Type
    </label>
    <div className="relative">
       <select
        id="roomType"
        value={Type}
        onChange={handleRoomTypeChange}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        required
      >
        <option value="">Select a room type</option>
          {Object.keys(roomTypes).map((type) => (
          <option key={type} value={type}>
          {type}
          </option>
          ))}
      </select>
    </div>
  </div>

  {Type && (
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
</form>
      </div>
    </div>
  </div>
);
};

export default BookPage;