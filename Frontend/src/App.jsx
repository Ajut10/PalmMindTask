import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatPage from './pages/ChatPage';
import AdminStats from './pages/AdminStats';
import Navbar from '../component/Navbar';
import Info from './pages/Info';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
     
      <Route path="/login" element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/stats' element={<AdminStats />}></Route>
      
      <Route path='/chat' element={<ChatPage />}></Route>
      <Route path='/navbar' element={<Navbar />}></Route>
      <Route path='/info' element={<Info />}></Route>
     </Routes>
    </>
  )
}

export default App
