import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import '../assets/css/Sidebar.css'
import Sidebar from '../components/sidebar'
import Logo from '../assets/images/logo.jpg'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Booking() {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  const [inputs, setInputs] = useState({});

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
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
              <h3>Booking</h3>
            </div>
          </div>
        </div>
      </div>

      <div className='container-booking'>
        <div className='booking'>
          <div className='logo'>
            <img src={Logo} alt="" />
          </div>
          <div className='details'>
            Enter your details
          </div>
          <div className='booking-content'>
            <div className='booking-form'>
              <div className=''></div>
              <form >
                <label>Title
                  <input className='title'
                    type="number"
                    name="roomId"
                    value={inputs.roomId || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>Firstname
                  <input
                    type="text"
                    name="Firstname"
                    value={inputs.fistname || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>Lastname
                  <input
                    type="text"
                    name="Lastname"
                    value={inputs.lastname || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>Email
                  <input
                    type="email"
                    name="Lastname"
                    value={inputs.lastname || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>CheckIn
                  <input
                    type="date"
                    name="checkIn"
                    value={inputs.checkIn || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>CheckOut
                  <input
                    type="date"
                    name="checkOut"
                    value={inputs.checkOut || ""}
                    onChange={handleChange}
                  />
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="col-lg-8">
            <p>© 2018 www.baraliresort.com. All rights reserved. </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Booking
