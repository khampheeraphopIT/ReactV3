import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import phoneIcon from '../assets/images/phone-icon.png'
import emailIcon from '../assets/images/email-icon.png'
import Logo from '../assets/images/logo.jpg'
import { Avatar } from '@mui/material';
import '../assets/css/Sidebar.css'
import Sidebar from '../components/sidebar'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();

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
  }, [])

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
                  <li><Link to="/" className="active">Home</Link></li>
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
              <h3>Contact US</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="contact section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <div className="section-heading text-center">
                <h6>| Contact Us</h6>
                <h2>Contact With Me</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3708.887800323572!2d102.2934739!3d12.0467416!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310411ada8813067%3A0x86c12c4aeec5d20c!2sBarali%20Beach%20Resort%20and%20Spa!5e1!3m2!1sth!2sth!4v1724576407612!5m2!1sth!2sth"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Google Map"
                ></iframe>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="item phone">
                    <img
                      src={phoneIcon}
                      alt="Phone Icon"
                      style={{ maxWidth: '52px' }}
                    />
                    <h6>
                      085-479-9573
                      <br />
                      <span>Phone Number</span>
                    </h6>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="item email">
                    <img
                      src={emailIcon}
                      alt="Email Icon"
                      style={{ maxWidth: '70px' }}
                    />
                    <h6>
                      rsvn@baraliresort.com
                      <br />
                      <span>Business Email</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <form id="contact-form" action="" method="post">
                <div className="row">
                  <div className="col-lg-12">
                    <fieldset>
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Name..."
                        autoComplete="on"
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Your E-mail..."
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <label htmlFor="message">Message</label>
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Your Message"
                      ></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="orange-button">
                        Send Message
                      </button>
                    </fieldset>
                  </div>
                </div>
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

export default Contact;