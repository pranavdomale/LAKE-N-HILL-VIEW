import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ForgetPassword from './components/Auth/ForgetPassword'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import RoomCards from './pages/RoomCards'
import Bookpage from './pages/BookPage'
import Navbar from './components/Navbar'
import { Book, MailIcon } from 'lucide-react' // Changed from Contact to MailIcon
import AdminDashboard from './pages/admindashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/about-us' element={<AboutUs/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/roomcards' element={<RoomCards/>} />
        <Route path='/bookpage' element={<Bookpage/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
      </Routes>
    </Router>
  )
}

export default App