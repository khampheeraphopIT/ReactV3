import React, { useState, useEffect } from 'react';
import '../assets/css/fontawesome.css';
import '../assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/swiper-bundle.css';
import deal_01 from '../assets/images/deal-01.jpg'
import deal_02 from '../assets/images/deal-02.jpg'
import properties_01 from '../assets/images/property-01.jpg'
import properties_02 from '../assets/images/property-02.jpg'
import properties_03 from '../assets/images/property-03.jpg'
import properties_04 from '../assets/images/property-04.jpg'
import properties_05 from '../assets/images/property-05.jpg'
import properties_06 from '../assets/images/property-06.jpg'
import phoneIcon from '../assets/images/phone-icon.png'
import emailIcon from '../assets/images/email-icon.png'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.jpg'
import Sidebar from '../components/sidebar'
import { Avatar } from '@mui/material';
import '../assets/css/Sidebar.css'

const Home = () => {
  const [selectedRoom, setSelectedRoom] = useState('SingleRoom')

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const slides = document.querySelectorAll('.main-banner .item')
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const slides = document.querySelectorAll('.main-banner .item')
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide)
    })
  }, [currentSlide])

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

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
                <Link to="/" className="logo">
                  <img src={Logo} alt="" />
                </Link>
                <ul className="nav">
                  <li><Link to="/" className="active">Home</Link></li>
                  <li><Link to="/SearchRoom">Search Room</Link></li>
                  <li><Link to="/Contact">Contact Us</Link></li>
                  <li><Link to="/RoomDetails"><i className="fa fa-calendar"></i><span>Book Now</span></Link></li>
                  {isLoggedIn ? (
                    <li><Avatar alt="Profile" onClick={handleSidebarToggle} /></li>
                  ) : (
                    <li><Avatar alt='Profile' onClick={handleSidebarToggle}></Avatar></li>
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
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />

      <div className="main-banner">
        <div className="item item-1">
          <div className="header-text">
            <span className="category">Koh Chang, <em>Trat</em></span>
            <h2>let's stay at<br />barali beach resort</h2>
          </div>
        </div>
        <div className="item item-2">
          <div className="header-text">
            <span className="category">Koh Chang, <em>Trat</em></span>
            <h2>Welcome Everyone To<br />barali beach resort</h2>
          </div>
        </div>
        <div className="item item-3">
          <div className="header-text">
            <span className="category">Koh Chang, <em>Trat</em></span>
            <h2>I love Yourself<br />barali beach resort</h2>
          </div>
        </div>
      </div>

      <div className="section best-deal">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="section-heading">
                <h6>| Best Deal</h6>
                <h2>Find Your Best Deal Right Now!</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="tabs-content">
                <div className="row">
                  <div className="nav-wrapper">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className={selectedRoom === 'SingleRoom' ? 'nav-link active' : 'nav-link'} id="SingleRoom-tab" data-bs-toggle="tab" data-bs-target="#SingleRoom"
                          type="button"
                          onClick={() => setSelectedRoom('SingleRoom')}> SingleRoom </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={selectedRoom === 'DoubleRoom' ? 'nav-link active' : 'nav-link'}
                          type="button"
                          onClick={() => setSelectedRoom('DoubleRoom')}>Double Room</button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="myTabContent">
                    {selectedRoom === 'SingleRoom' && (
                      <div className="tab-pane fade show active" role="tabpanel">
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="info-table">
                              <ul>
                                <li>Number of rooms <span>1</span></li>
                                <li>Total Flat Space <span>225 m2</span></li>
                                <li>Room Price <span>THB 3600</span></li>
                                <li>Payment Process <span>Bank</span></li>
                                <li>Parking Available <span>Yes</span></li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <img src={deal_01} alt="Deal01" />
                          </div>
                          <div className="col-lg-3">
                            <p>Perfect for solo travelers, our Single Room offers a cozy space with one bed, ideal for rest and relaxation.
                              <br /><br />The room is equipped with essential amenities such as a work desk, flat-screen TV, and complimentary Wi-Fi, ensuring a smooth and comfortable stay.</p>
                            <div className="main-button">
                              <Link to="/RoomDetails/1"><i className="fa fa-calendar"></i> Room Details </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedRoom === 'DoubleRoom' && (
                      <div className="tab-pane fade show active" role="tabpanel">
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="info-table">
                              <ul>
                                <li>Number of rooms <span>4</span></li>
                                <li>Total Flat Space <span>400 m2</span></li>
                                <li>Room Price <span>THB 5000</span></li>
                                <li>Payment Process <span>Bank</span></li>
                                <li>Parking Available <span>Yes</span></li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <img src={deal_02} alt="Deal" />
                          </div>
                          <div className="col-lg-3">
                            <p>Ideal for couples or friends traveling together, our Double Room features a spacious layout with either one large bed or two single beds, allowing you to choose the most convenient option.
                              <br /><br />The room also comes with amenities like air conditioning, a private bathroom, and minibar.</p>
                            <div className="main-button">
                              <Link to="/RoomDetails/4"><i className="fa fa-calendar"></i> Room Details </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="properties section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <div className="section-heading text-center">
                <h6>| Room Specifications</h6>
                <h2>Find Your Favorite Room!</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="item">
                <Link to={`/RoomDetails/1`}>
                  <img src={properties_01} alt="DELUXE VILLA" />
                </Link>
                <span className="category">Single Room</span>
                <h6>THB 3500</h6>
                <h4>DELUXE VILLA</h4>
                <ul>
                  <li>Number of rooms: <span>1</span></li>
                  <li>Area: <span>15 x 15m</span></li>
                  <li>Stay 2 Nights Extra Save <span>5%</span></li>
                </ul>
                <div className="main-button">
                  <Link to={`/RoomDetails/1`}><i className="fa fa-calendar"></i> Room Details </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="item">
                <Link to={`/RoomDetails/2`}>
                  <img src={properties_02} alt="DELUXE VILLA" />
                </Link>
                <span className="category">Single Room</span>
                <h6>THB 4000</h6>
                <h4>PREMIER DELUXE VILLA</h4>
                <ul>
                  <li>Number of rooms: <span>1</span></li>
                  <li>Area: <span>15 x 17m</span></li>
                  <li>Stay 2 Nights Extra Save <span>5%</span></li>
                </ul>
                <div className="main-button">
                  <Link to={`/RoomDetails/2`}><i className="fa fa-calendar"></i> Room Details </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="item">
                <Link to={`/RoomDetails/3`}>
                  <img src={properties_03} alt="DELUXE VILLA" />
                </Link>
                <span className="category">Single Room</span>
                <h6>THB 5000</h6>
                <h4>POOL VILLA</h4>
                <ul>
                  <li>Number of rooms: <span>1</span></li>
                  <li>Area: <span>15 x 25m</span></li>
                  <li>Stay 2 Nights Extra Save <span>5%</span></li>
                </ul>
                <div className="main-button">
                  <Link to={`/RoomDetails/3`}><i className="fa fa-calendar"></i> Room Details </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="item">
                <Link to={`/RoomDetails/4`}>
                  <img src={properties_04} alt="DELUXE VILLA" />
                </Link>
                <span className="category">Double Room</span>
                <h6>THB 6000</h6>
                <h4>DELUXE VILLA</h4>
                <ul>
                  <li>Number of rooms: <span>2</span></li>
                  <li>Area: <span>20 x 20m</span></li>
                  <li>Stay 2 Nights Extra Save <span>5%</span></li>
                </ul>
                <div className="main-button">
                  <Link to={`/RoomDetails/4`}><i className="fa fa-calendar"></i> Room Details </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="item">
                <Link to={`/RoomDetails/5`}>
                  <img src={properties_05} alt="DELUXE VILLA" />
                </Link>
                <span className="category">Double Room</span>
                <h6>THB 65000</h6>
                <h4>PREMIER DELUXE VILLA</h4>
                <ul>
                  <li>Number of rooms: <span>3</span></li>
                  <li>Area: <span>25 x 25m</span></li>
                  <li>Stay 2 Nights Extra Save <span>10%</span></li>
                </ul>
                <div className="main-button">
                  <Link to={`/RoomDetails/5`}><i className="fa fa-calendar"></i> Room Details </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="item">
                <Link to={`/RoomDetails/6`}>
                  <img src={properties_06} alt="DELUXE VILLA" />
                </Link>
                <span className="category">Double Room</span>
                <h6>THB 7500</h6>
                <h4>POOL VILLA</h4>
                <ul>
                  <li>Number of rooms: <span>4</span></li>
                  <li>Area: <span>30 x 30m</span></li>
                  <li>Stay 2 Nights Extra Save <span>12%</span></li>
                </ul>
                <div className="main-button">
                  <Link to={`/RoomDetails/6`}><i className="fa fa-calendar"></i> Room Details </Link>
                </div>
              </div>
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
  );
}

export default Home;
