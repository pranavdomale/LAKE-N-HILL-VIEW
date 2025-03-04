import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Star , Calendar ,Maximize, Wind } from "lucide-react"; //,Calendar, Users
import bikeImage1 from "../assets/royal-enfield-bullet-pictures-q3lm0w8x5hx4ri5f.jpg";
import bikeImage2 from "../assets/paasion-pro.jpg";
import bikeImage3 from "../assets/activa 5G.jpg";

const bikeTypes = {
    "Activa 5G": { price: 700, discount: 10},
    "Royal Enfield Bullet": { price: 2000, discount: 10},
    "Passion Pro": { price: 1200, discount: 10 },
  };

const bike = {
  id: 1,
  name: "Bike Rental",
  description: "Rent a premium bike for your trip and experience the ultimate freedom on the open road. With top-of-the-line features and a smooth, powerful ride, these bikes offer comfort, style, and performance for an unforgettable journey. Whether you're exploring scenic routes or embarking on an adventure, renting a premium bike ensures you'll travel in both luxury and thrill.",
  capacity: 2,
  rating: 4,
  features: ["Helmet Included", "GPS Navigation", "Fuel Included", "24/7 Assistance"],
  images: [bikeImage1, bikeImage2, bikeImage3],
};

const BikeBookPage = () => {
    const navigate = useNavigate();
    const [guestName, setguestName] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [returnDate, setreturnDate] = useState('');
    const [rentalDate, setrentalDate] = useState('');
    const [model, setmodel] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [address, setAddress] = useState('');
    const [guestCount, setGuestCount] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);
  
    const handleBikeTypeChange = (e) => {
        const selectedType = e.target.value;
        setmodel(selectedType);
        if (bikeTypes[selectedType]) {
            setPrice(bikeTypes[selectedType].price);
            setDiscount(bikeTypes[selectedType].discount);
        } else {
          setPrice(0);
          setDiscount(0);
        }
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const bookingInfo = { guestName, phoneno, returnDate, rentalDate, model, address, guestCount };
      const info = {returnDate, rentalDate, model};
      console.log("Booking info array:", bookingInfo);
  
      // Fix Date comparison
      if (new Date(returnDate) >= new Date(rentalDate)) {
        alert("Invalid date selection. Check-out must be after check-in.");
        return;
      }
  
      if (!model) {
        alert("Please select a bike type.");
        return;
      }
  
      try {
        const availabilityResponse = await axios.post("http://localhost:5000/availability_bike", info, {
            headers: { "Content-Type": "application/json" }
        });
        console.log("Availability:", availabilityResponse);
        
        if (availabilityResponse.data.success === 'Bike is not available') {
          alert("Bike is not available for the selected dates.");
          return;
        }
  
        const bookingResponse = await axios.post("http://localhost:5000/book_bike", bookingInfo, {
            headers: { "Content-Type": "application/json" }
        });
        console.log("Booking Response:", bookingResponse);
        
        if (bookingResponse.status === 200) {
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
              src={bike.images[currentImage] || "/placeholder.svg"}
              alt={`${bike.name} - View ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {bike.images.map((_, index) => (
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{bike.name}</h1>
            <div className="flex items-center mb-4">
              {[...Array(bike.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600">({bike.rating} stars)</span>
            </div>
            <p className="text-gray-600 mb-6">{bike.description}</p>
  
            {/* Bike Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bike Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Maximize className="w-5 h-5 text-gray-500 mr-2" />
                  <span>
                    <strong>Capacity:</strong> {bike.capacity} persons
                  </span>
                </div>
                <div className="flex items-center">
                  <Wind className="w-5 h-5 text-gray-500 mr-2" />
                  <span>
                    <strong>Features:</strong> {bike.features.join(", ")}
                  </span>
                </div>
              </div>
            </div>
  
          </div>
        </div>
  
        {/* Booking Sidebar */}
        <div className="lg:w-1/3 p-6 lg:p-10 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book Your Bike</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
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
                  id="returnDate"
                  value={returnDate}
                  onChange={(e) => setreturnDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
                
              </div>
  
              <div>
                <label htmlFor="rentalDate" className="block text-gray-700 font-semibold mb-2">
                Return Date
                </label>
                <div className="relative">
                <Calendar className="w-5 h-5 text-gray-500 absolute left-3 top-3"/>
                <input
                  type="date"
                  id="rentalDate"
                  value={rentalDate}
                  onChange={(e) => setrentalDate(e.target.value)}
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
                  id="guestCount"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  min="1"
                  max={bike.capacity}
                  className="w-full pl-4 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
  
              <div>
    <label htmlFor="bikeType" className="block text-gray-700 font-semibold mb-2">
      Bike Type
    </label>
    <div className="relative">
       <select
        id="Model"
        value={model}
        onChange={handleBikeTypeChange}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        required
      >
        <option value="">Select a bike type</option>
          {Object.keys(bikeTypes).map((model) => (
          <option key={model} value={model}>
          {model}
          </option>
          ))}
      </select>
    </div>
  </div>

  {model && (
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
  
  export default BikeBookPage;