import React,{ useState } from "react"
import {
  Wifi,
  Coffee,
  Users,
  Utensils,
  Bath,
  Maximize,
  Bike,
  Clock,
  MapPin,
  Music,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer/Footer"
import { useNavigate } from "react-router-dom"
import "./styles.css"

// Import all images
import single_image1 from "../assets/single-room-01.jpg"
import single_image2 from "../assets/single-room-02.jpg"
import single_image3 from "../assets/single-room-03.jpg"
import single_image4 from "../assets/single-room-04.jpg"
import delux_image1 from "../assets/Delux Room.jpg"
import delux_image2 from "../assets/Delux Room-2.jpg"
import delux_image3 from "../assets/Delux Room-4.jpg"
import delux_image4 from "../assets/Delux Room-8.jpg"
import super_image1 from "../assets/Super Delux Room-images-0.jpg"
import super_image2 from "../assets/Super Delux Room-images-1.jpg"
import super_image3 from "../assets/Super Delux Room-images-3.jpg"
import super_image4 from "../assets/Super Delux Room-images-4.jpg"
import lux_image1 from "../assets/Luxury Room_page-0001.jpg"
import lux_image2 from "../assets/Luxury Room_page-0004.jpg"
import lux_image3 from "../assets/Luxury Room_page-0005.jpg"
import lux_image4 from "../assets/Luxury Room_page-0006.jpg"
import bike_image1 from "../assets/activa 5G.jpg"
import bike_image2 from "../assets/royal-enfield-bullet-pictures-q3lm0w8x5hx4ri5f.jpg"
import bike_image3 from "../assets/paasion-pro.jpg"
import hall_image1 from "../assets/hall-01.jpg"
import hall_image2 from "../assets/hall-02.jpg"
import hall_image3 from "../assets/hall-03.jpg"

// Room data
const rooms = [
  {
    id: 1,
    name: "Single Room",
    price: 900,
    originalPrice: 1900,
    discount: 53,
    amenities: ["Free WiFi", "Non-smoking", "Shower", "Book Now & Pay Later"],
    description: "Comfortable single room with essential amenities",
    capacity: 1,
    size: "10 m²",
    images: [single_image1, single_image2, single_image3, single_image4],
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: 1073,
    originalPrice: 1900,
    discount: 44,
    amenities: ["Free WiFi", "Breakfast Included", "Mini Bar", "TV"],
    description: "Spacious deluxe room with added comfort",
    capacity: 2,
    size: "15 m²",
    images: [delux_image1, delux_image2, delux_image3, delux_image4],
  },
  {
    id: 3,
    name: "Super Deluxe Room",
    price: 1592,
    originalPrice: 1900,
    discount: 17,
    amenities: ["Free WiFi", "Breakfast & Lunch", "Mini Bar", "Balcony"],
    description: "Luxury room with premium amenities and meals included",
    capacity: 2,
    size: "20 m²",
    images: [super_image1, super_image2, super_image3, super_image4],
  },
  {
    id: 4,
    name: "Luxury Suite",
    price: 2500,
    originalPrice: 3000,
    discount: 15,
    amenities: ["Free WiFi", "All Meals", "Jacuzzi", "City View"],
    description: "Premium suite with all luxury amenities",
    capacity: 3,
    size: "30 m²",
    images: [lux_image1, lux_image2, lux_image3, lux_image4],
  },
]

// Bike data
const bikes = [
  {
    id: 1,
    name: "Activa 5G",
    price: 50,
    originalPrice: 75,
    discount: 33,
    features: ["All-terrain", "21 Gears", "Front Suspension", "Helmet Included"],
    description: "Perfect for off-road adventures and trail riding",
    capacity: 1,
    duration: "24 hours",
    images: [bike_image1],
  },
  {
    id: 2,
    name: "Royal Enfeild Bullet",
    price: 30,
    originalPrice: 45,
    discount: 33,
    features: ["Comfortable Seat", "7 Gears", "Basket", "Lights Included"],
    description: "Ideal for city tours and casual rides",
    capacity: 1,
    duration: "24 hours",
    images: [bike_image2],
  },
  {
    id: 3,
    name: "Passion Pro",
    price: 75,
    originalPrice: 100,
    discount: 25,
    features: ["Electric Assist", "Range 50km", "Removable Battery", "LCD Display"],
    description: "Effortless riding with electric assistance",
    capacity: 1,
    duration: "24 hours",
    images: [bike_image3],
  },
]

// Hall data
const halls = [
  {
    id: 1,
    name: "Conference Hall",
    price: 5000,
    originalPrice: 7500,
    discount: 33,
    features: ["Projector", "Sound System", "Wi-Fi", "Catering Available"],
    description: "Perfect for business meetings and conferences",
    capacity: 100,
    duration: "Per day",
    images: [hall_image1],
  },
  {
    id: 2,
    name: "Banquet Hall",
    price: 8000,
    originalPrice: 10000,
    discount: 20,
    features: ["Stage", "Dance Floor", "Lighting System", "Kitchen Access"],
    description: "Ideal for parties and social gatherings",
    capacity: 200,
    duration: "Per day",
    images: [hall_image2],
  },
  {
    id: 3,
    name: "Wedding Hall",
    price: 15000,
    originalPrice: 20000,
    discount: 25,
    features: ["Decorations", "Bridal Room", "Parking", "Outdoor Area"],
    description: "Beautiful venue for your special day",
    capacity: 300,
    duration: "Per day",
    images: [hall_image3],
  },
]

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="image-carousel">
      <img src={images[currentImageIndex] || "/placeholder.svg"} alt="Item" className="carousel-image" />
      <button className="carousel-button prev" onClick={prevImage}>
        <ChevronLeft />
      </button>
      <button className="carousel-button next" onClick={nextImage}>
        <ChevronRight />
      </button>
    </div>
  )
}

const CombinedListing = () => {
  const [listingType, setListingType] = useState("rooms")
  const navigate = useNavigate();

  const handleBookingClick = () => {
    if (Users) {
      if (listingType === "rooms") {
        navigate("/room-booking")
      } else if (listingType === "bikes") {
        navigate("/bike-booking");
      } else {
        navigate("/hall-booking"); // Default navigate (or change to another path for other cases)
      }
    } else {
      alert("Please log in to continue.");
      navigate("/login");
    }
  };

  const getIcon = (item) => {
    if (listingType === "rooms") {
      if (item.includes("WiFi")) return <Wifi className="icon" />
      if (item.includes("Breakfast")) return <Coffee className="icon" />
      if (item.includes("Lunch")) return <Utensils className="icon" />
      if (item.includes("Shower")) return <Bath className="icon" />
      return null
    } else if (listingType === "bikes") {
      if (item.includes("Gears")) return <Bike className="icon" />
      if (item.includes("Helmet")) return <Users className="icon" />
      if (item.includes("Electric")) return <Bike className="icon" />
      return <MapPin className="icon" />
    } else if (listingType === "halls") {
      if (item.includes("Wi-Fi")) return <Wifi className="icon" />
      if (item.includes("Sound") || item.includes("Music")) return <Music className="icon" />
      if (item.includes("Catering") || item.includes("Kitchen")) return <MapPin className="icon" />
      return <Users className="icon" />
    }
  }

  const renderListingItem = (item) => (
    <div key={item.id} className={`${listingType}-card`}>
      <div className="image-container">
        <ImageCarousel images={item.images} />
        <span className="discount-badge">-{item.discount}%</span>
      </div>
  
      <div className={`${listingType}-content`}>
        <div className={`${listingType}-header`}>
          <h2>{item.name}</h2>
          <div className="capacity">
            <Users className="icon" />
            <span>Max {item.capacity}</span>
          </div>
        </div>
  
        {listingType === "rooms" && (
          <div className="room-size">
            <Maximize className="icon" />
            {item.size}
          </div>
        )}
  
        {(listingType === "bikes" || listingType === "halls") && (
          <div className="duration">
            <Clock className="icon" />
            {item.duration}
          </div>
        )}
  
        <div className={listingType === "rooms" ? "amenities" : "features"}>
          {(item.amenities || item.features).map((feature, index) => (
            <div key={index} className={listingType === "rooms" ? "amenity" : "feature"}>
              {getIcon(feature)}
              <span>{feature}</span>
            </div>
          ))}
        </div>
  
        <p className="description">{item.description}</p>
  
        <div className={`${listingType}-footer`}>
          <div className="price-info">
            <span className="original-price">Rs. {item.originalPrice}</span>
            <span className="current-price">Rs. {item.price}</span>
            <span className="price-note">
              {listingType === "rooms" ? "Per night before taxes and fees" : item.duration}
            </span>
          </div>
          <button className="book-button" 
          onClick={handleBookingClick}>
            {listingType === "rooms" ? "Book Now" : listingType === "bikes" ? "Rent Now" : "Book Now.."}
          </button>
        </div>
      </div>
    </div>
  )
  
  const renderListing = () => {
    switch (listingType) {
      case "rooms":
        return rooms.map(renderListingItem)
      case "bikes":
        return bikes.map(renderListingItem)
      case "halls":
        return halls.map(renderListingItem)
      default:
        return null
    }
  }
  
  return (
    <div className="page-container">
      <Navbar />
      <div className="combined-listing">
        <div className="container">
          <div className="header">
            <h1>Available {listingType.charAt(0).toUpperCase() + listingType.slice(1)}</h1>
            <select
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              className="listing-type-select"
            >
              <option value="rooms">Rooms</option>
              <option value="bikes">Bikes</option>
              <option value="halls">Halls</option>
            </select>
          </div>
  
          <div className={`${listingType}-grid`}>{renderListing()}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}  

export default CombinedListing;