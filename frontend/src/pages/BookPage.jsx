import React, { useState } from "react"
import { Star, Users, Calendar, Maximize, BedDouble, ShowerHead, Wind, Utensils } from "lucide-react"

const room = {
  id: 1,
  name: "Luxury Ocean View Suite",
  description:
    "Experience unparalleled luxury in our Ocean View Suite. Enjoy breathtaking panoramic views of the crystal-clear waters, a spacious living area, and a private balcony. This suite offers the perfect blend of comfort and sophistication for an unforgettable stay.",
  price: 450,
  capacity: 2,
  rating: 5,
  size: 55, // in square meters
  bedType: "King Size",
  view: "Ocean View",
  amenities: [
    "Private Balcony",
    "Room Service",
    "Flat-screen TV",
    "Free WiFi",
    "Air Conditioning",
    "In-room Safe",
  ],
  images: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
  ],
}

const BookPage = () => {
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guests, setGuests] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Booking submitted:", { roomId: room.id, checkInDate, checkOutDate, guests })
    alert("Booking submitted successfully!")
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
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
                  <strong>Size:</strong> {room.size} m²
                </span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 mr-2" />
                <span>
                  <strong>Capacity:</strong> Up to {room.capacity} guests
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
      <div className="lg:w-1/3 p-6 lg:p-10 lg:sticky lg:top-0 lg:h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book Your Stay</h2>
          <div className="mb-6">
            <span className="text-3xl font-bold text-pink-500">${room.price}</span>
            <span className="text-gray-600 ml-1">per night</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="checkIn" className="block text-gray-700 font-semibold mb-2">
                Check-in Date
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
                <input
                  type="date"
                  id="checkIn"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
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
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="guests" className="block text-gray-700 font-semibold mb-2">
                Number of Guests
              </label>
              <div className="relative">
                <Users className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
                <input
                  type="number"
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                  min="1"
                  max={room.capacity}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookPage