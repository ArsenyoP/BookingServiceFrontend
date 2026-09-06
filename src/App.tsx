import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import HomePage from './Pages/HomePage/HomePage'
import ListingDetailsPage from './Pages/ListingDetailsPage/ListingDetailsPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/listing-details' element={<ListingDetailsPage/>}></Route>
    </Routes>
  )
}

export default App