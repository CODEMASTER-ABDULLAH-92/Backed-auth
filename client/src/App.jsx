import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast';
import Abdullah from './pages/Abdullah';
const App = () => {
  return (
    <div>
 <Toaster />
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/abdullah' element={<Abdullah/>}/>
      </Routes>
    </div>
  )
}

export default App
