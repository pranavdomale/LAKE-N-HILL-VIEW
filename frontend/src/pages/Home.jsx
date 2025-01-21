import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ImageCarousel from "../components/ImageCarousel/ImageCarousel";
import Footer from "../components/Footer/Footer";

const Home = () => (
  <>
    {/* 1st Section */}
    <section
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/p/AF1QipNQKR7SRzUMCKitg9UB3GTqQLv5hHCfk6yxsw2g=s1360-w1360-h1020')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative">
        <Navbar />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
        <h1 className="text-5xl md:text-6xl font-bold font-poppins">
          Welcome to Lake N Hill View
        </h1>
        <p className="mt-4 text-lg md:text-xl font-light font-montserrat">
          Discover our world-class hotel & restaurant resort.
        </p>
        <div className="mt-8 md:flex space-x-4 font-ptsans">
          <button className="bg-gradient-to-r from-fuchsia-700 to-pink-600 tracking-wider hover:bg-gradient-to-r hover:from-fuchsia-800 hover:to-pink-700 text-white py-3 px-8 rounded-full shadow-lg font-normal">
            EXPLORE THE BEAUTY
          </button>
          <button className="bg-transparent text-white tracking-wider border-[1px] border-white hover:bg-gray-200 hover:text-black py-3 px-8 rounded-full shadow-lg font-normal">
            BOOK NOW
          </button>
        </div>
      </div>
    </section>
    {/* Features Section */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-poppins">
          Discover Our Amenities
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Luxurious Rooms", icon: "🛏️", description: "Indulge in our spacious, elegantly designed rooms with breathtaking views." },
            { title: "Gourmet Dining", icon: "🍽️", description: "Savor exquisite cuisine prepared by our world-class chefs." },
            { 
              title: "Motor Bike Adventures", 
              icon: "🏍️", 
              description: "Explore scenic routes with our premium motor bike rental service and guided tours." 
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 font-poppins">{feature.title}</h3>
              <p className="text-gray-600 font-montserrat">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    {/* 2nd Section */}
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-poppins">
          You Can Visit
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Hotel Rooms Card */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="h-64 overflow-hidden">
              <img
                src=""
                alt="Luxury Hotel Room"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 font-poppins">Hotel Rooms</h3>
              <p className="text-gray-600 mb-4 font-montserrat">
                Experience luxury in our elegantly designed rooms with modern amenities and stunning views.
              </p>
              <button className="w-full bg-gradient-to-r from-fuchsia-700 to-pink-600 text-white py-2 px-4 rounded-full hover:from-fuchsia-800 hover:to-pink-700 transition-colors duration-300 font-ptsans">
                EXPLORE A ROOMS
              </button>
            </div>
          </div>

          {/* Lake Side Views Card */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="h-64 overflow-hidden">
              <img
                src="frontend\src\assets\2023-05-19(3)-min(1).jpg"
                alt="Lake Side View"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 font-poppins">Lake Side Views</h3>
              <p className="text-gray-600 mb-4 font-montserrat">
                Immerse yourself in breathtaking lake views and serene natural surroundings.
              </p>
              <button className="w-full bg-gradient-to-r from-fuchsia-700 to-pink-600 text-white py-2 px-4 rounded-full hover:from-fuchsia-800 hover:to-pink-700 transition-colors duration-300 font-ptsans">
                EXPLORE VIEWS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* 3rd Section */}
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            A Glimpse of Paradise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-montserrat">
            Experience the perfect blend of luxury and nature at Lake N Hill View. Our resort offers breathtaking views, world-class amenities, and unforgettable moments for you and your loved ones.
          </p>
        <ImageCarousel />
      </div>
    </section>
     {/* Call to Action Section */}
     <section className="py-20 bg-gradient-to-r from-fuchsia-700 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
          Ready for an Unforgettable Getaway?
        </h2>
        <p className="text-xl mb-8 font-montserrat">
          Book your stay now and create memories that will last a lifetime.
        </p>
        <button className="bg-white text-fuchsia-700 py-3 px-8 rounded-full shadow-lg font-bold transition-transform hover:scale-105 font-ptsans">
          RESERVE YOUR STAY
        </button>
      </div>
    </section>
    <Footer />
   
  </>
);

export default Home;
