import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage/HomePage'
import ListingDetailsPage from './Pages/ListingDetailsPage/ListingDetailsPage'
import RoomsPage from './Pages/RoomsPage/RoomsPage'
import RoomDetailsPage from './Pages/RoomDerails/RoomDetailsPage'

function App() {  

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/listing-details/:id' element={<ListingDetailsPage/>}></Route>
      <Route path='/room-details/:id' element={<RoomDetailsPage/>}></Route>
      <Route path='/rooms/:listingId' element={<RoomsPage/>}></Route>
    </Routes>
  )
}

export default App