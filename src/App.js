import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import SearchRoom from "./components/SearchRoom";
import RoomDetails from "./components/RoomDetails";
import Contact from "./components/Contact";
import Login from './components/Login';
import BookingDetail from './components/BookingDetail';
import Register from "./components/Register";
import Profile from "./components/Profile";
import Boooking from "./components/booking"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/searchRoom' element={<SearchRoom />}></Route>
                <Route path="/roomDetails/:roomId" element={<RoomDetails />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/bookingDetail" element={<BookingDetail />}></Route>
                <Route path="/booking" element={<Boooking />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;