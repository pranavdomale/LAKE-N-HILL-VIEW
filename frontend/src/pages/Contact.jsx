import React from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { Card } from "./Card"
import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar"
export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Visit Us Section */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">Visit Us</h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          We are located in the heart of Uadaipur, Rajasthan. Explore our location, contact details, and directions
          below.
        </p>
        <Navbar />

        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.803752859086!2d72.83183067506647!3d19.051660682107928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c93f1c1f8aa3%3A0x3c3c3d7b9c7f7f7c!2sNeville%20D&#39;Souza%20Football%20Turf!5e0!3m2!1sen!2sin!4v1705940436285!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
            className="w-full"
          />
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Phone Card */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-pink-50 rounded-full">
                <Phone className="w-6 h-6 text-pink-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Phone</h2>
              <p className="text-gray-600">+91  7878799889</p>
            </div>
          </Card>

          {/* Address Card */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-pink-50 rounded-full">
                <MapPin className="w-6 h-6 text-pink-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Address</h2>
              <p className="text-gray-600">
              60, Rope Way, Near Fatehsagar Lake, Beside Jain Temple
              Dewali, Panchwati, Udaipur, 313001 Rajasthan India
              </p>
            </div>
          </Card>

          {/* Email Card */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-pink-50 rounded-full">
                <Mail className="w-6 h-6 text-pink-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Email</h2>
              <p className="text-gray-600">lakenhillview@gmail.com</p>
            </div>
          </Card>
        </div>

        {/* Operating Hours */}
        <Card className="max-w-2xl mx-auto p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Operating Hours</h2>
          <div className="space-y-2 text-center">
            <p className="text-gray-600">Monday - Sunday: Opened 24 Hours</p>
          </div>
        </Card>
      </section>
      <Footer />
    </div>
  )
}
