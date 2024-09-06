import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Logo from '../assets/images/logo.jpg'
import { Avatar } from '@mui/material';
import '../assets/css/Sidebar.css'
import Sidebar from './sidebar'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function BookingDetails() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [user, setUser] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  const [isLoaded, setIsLoaded] = useState(true);
  const [booking, setBooking] = useState({});

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:3333/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          setUser(result.user)
          setIsLoaded(false)
        } else if (result.status === 'forbidden') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          }).then((value) => {
            navigate('/')
          })
        }
        console.log(result)
      })
      .catch((error) => console.error(error));
  }, [MySwal, navigate])

  if (isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(booking);
    return (
      <>
        <div className="sub-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <ul className="info">
                <li><i className="fa fa-envelope"></i> rsvn@baraliresort.com</li>
                <li><i className="fa fa-map"></i> Barali Beach Resort 10240</li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
              <ul className="social-links">
                <li><Link to="https://www.facebook.com/baraliresort/?locale=th_TH"><i className="fab fa-facebook"></i></Link></li>
                <li><Link to="https://www.instagram.com/barali_beach_resort/"><i className="fab fa-instagram"></i></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="/" className="logo">
                  <img src={Logo} alt="" />
                </a>
                <ul className="nav">
                  <li><Link to="/Profile" className="active">Home</Link></li>
                  <li><Link to="/SearchRoom">Search Room</Link></li>
                  <li><Link to="/Contact">Contact Us</Link></li>
                  <li><Link to="/RoomDetails"><i className="fa fa-calendar"></i><span>Book Now</span></Link></li>
                  {isLoggedIn ? (
                    <li>
                      <Avatar
                        src={user.image ? `data:image/jpeg;base64,${user.image}` : 'default-image-url'}
                        alt={user.id}
                        onClick={handleSidebarToggle}
                      />
                    </li>
                  ) : (
                    <li>
                      <button onClick={handleSidebarToggle}>Login</button>
                    </li>
                  )}
                </ul>
                <div className='menu-trigger'>
                  <span>Menu</span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarToggle}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />

      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>My Booking</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="booking-container">
  {Array.isArray(booking) && booking.length > 0 ? (
    booking.map((booking, index) => (
      <div key={index} className="booking-table">
        <div className="booking-row">
          <div className="booking-cell"><strong>Booking Number:</strong> {booking.bookingNumber}</div>
          <div className="booking-cell"><strong>Number Of Rooms:</strong> {booking.NumberOfRooms}</div>
          <div className="booking-cell"><strong>Room Name:</strong> {booking.roomName}</div>
          <div className="booking-cell"><strong>Room Type:</strong> {booking.roomType}</div>
          <div className="booking-cell"><strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString()}</div>
          <div className="booking-cell"><strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</div>
          <div className={`booking-cell ${booking.payment === 'pending' ? 'pending-payment' : ''}`}>
            <strong>Payment:</strong> {booking.payment}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>No bookings available</div>
  )}
</div>

      </>
    );
  }
}

export default BookingDetails;
