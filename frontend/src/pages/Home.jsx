import React from 'react';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar/Navbar';

const Home = () => (
    <>
    <div
        className="relative bg-cover bg-center h-screen"
        style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/p/AF1QipNQKR7SRzUMCKitg9UB3GTqQLv5hHCfk6yxsw2g=s1360-w1360-h1020')",
        }}
    >
        {/* Add overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className='relative'>
            <Navbar />
        </div>
        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
            <h1 className="text-5xl md:text-6xl font-bold font-poppins">
                Welcome to Lake N Hill View
            </h1>
            <p className="mt-4 text-lg md:text-xl font-light font-montserrat">
                Discover our world-class hotel & restaurant resort.
            </p>
            <div className="mt-8 flex space-x-4 font-ptsans">
                <button className="bg-gradient-to-r from-fuchsia-700 to-pink-600 tracking-wider hover:bg-gradient-to-r hover:from-fuchsia-800 hover:to-pink-700 text-white py-3 px-8 rounded-full shadow-lg font-normal">
                    EXPLORE THE BEAUTY
                </button>
                <button className="bg-transparent text-white tracking-wider border-[1px] border-white hover:bg-gray-200 hover:text-black font-semibold py-3 px-8 rounded-full shadow-lg font-normal">
                    BOOK NOW
                </button>
            </div>
        </div>
    </div>

    </>
);

export default Home;