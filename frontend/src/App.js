import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ForgetPassword from './components/Auth/ForgetPassword'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import { MailIcon } from 'lucide-react' // Changed from Contact to MailIcon

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
      </Routes>
    </Router>
  )
}

export default App