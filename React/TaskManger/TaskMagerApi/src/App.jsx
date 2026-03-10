import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home"
import Add from "./pages/Add Task/ADDTask"
import ShowAll from './pages/Show/showAll';
import Delete from './pages/delete/delete'

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path ='/' element={<Home/>} />
      <Route path = '/add' element={<Add/>} />
      <Route path = '/showall' element={<ShowAll/>} />
      <Route path="/delete/:id" element={<Delete/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
