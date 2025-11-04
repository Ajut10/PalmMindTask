import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path="/" element={<h1>Hello World</h1>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
     </Routes>
    </>
  )
}

export default App
