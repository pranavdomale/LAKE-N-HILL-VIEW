import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext";
import Home from '../src/pages/Home';
import Login from '../src/components/Auth/Login';
import Register from '../src/components/Auth/Register';
import ForgetPassword from '../src/components/Auth/ForgetPassword';
import AboutUs from '../src/pages/AboutUs';
import Contact from '../src/pages/Contact';
import Service from '../src/pages/RoomCards';
import Biketype from './pages/bikebook';
import Roomtype from './pages/roomtype';
import Halltype from './pages/halltype';
import ShowBooking from "../src/pages/mybooking";
import Payment from '../src/pages/Payment';
import AdminDashboard from '../src/pages/admindashboard';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forgot-password' element={<ForgetPassword />}></Route>
          <Route path='/about-us' element={<AboutUs />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/service' element={<Service />}></Route>
          <Route path='/room-booking' element={<Roomtype />}></Route>
          <Route path='/hall-booking' element={<Halltype/>}></Route>
          <Route path='/bike-booking' element={<Biketype />}></Route>
          <Route path='/my-booking' element={<ShowBooking />}></Route>
          <Route path='/payment' element={<Payment />}></Route>
          <Route path='/admin' element={<AdminDashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;