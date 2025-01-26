import React from 'react';
import { Link } from "react-router-dom";
import { ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
   
      
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[60vh]" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
      }}>
        <Navbar />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center font-poppins">About Lake N Hill View</h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl px-4 font-montserrat">
            Discover the story behind our luxurious retreat
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-poppins">Our Story</h2>
            <p className="text-lg mb-6 font-montserrat">
              Founded in 1985, Lake N Hill View began as a small family-owned lodge nestled in the heart of breathtaking natural beauty. Over the years, we've grown into a world-class luxury resort, never losing sight of our roots and commitment to providing exceptional experiences for our guests.
            </p>
            <p className="text-lg mb-6 font-montserrat">
              Our journey has been one of continuous improvement and dedication to excellence. From our humble beginnings to our current status as a preferred destination for discerning travelers, we've always put our guests first, ensuring that every stay is memorable and rejuvenating.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-poppins">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Luxury in Nature", icon: "🏞️", description: "We believe in harmonizing opulent comfort with the serene beauty of our natural surroundings." },
              { title: "Exceptional Service", icon: "🌟", description: "Our staff is dedicated to providing personalized, attentive service that exceeds expectations." },
              { title: "Sustainability", icon: "🌿", description: "We are committed to preserving our environment and supporting our local community." },
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 font-poppins">{value.title}</h3>
                <p className="text-gray-600 font-montserrat">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-poppins">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" 
                alt="Luxury Suite" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4 font-poppins">Unparalleled Luxury</h3>
              <p className="text-lg mb-6 font-montserrat">
                Our resort offers a perfect blend of opulent accommodations and breathtaking natural beauty. From our exquisitely appointed rooms to our world-class amenities, every detail is crafted to provide an unforgettable experience.
              </p>
              <ul className="space-y-2 font-montserrat">
                {["Stunning lake and mountain views", "Gourmet dining experiences", "Premium motor bike adventures", "Personalized concierge service"].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-fuchsia-700 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

     
      <Footer />
    </div>
  );
};

export default AboutUs;

