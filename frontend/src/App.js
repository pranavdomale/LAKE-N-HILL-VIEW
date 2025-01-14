import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ForgetPassword from './components/Auth/ForgetPassword'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forget-password' element={<ForgetPassword />} />
      </Routes>
    </Router>
  )
}

export default App