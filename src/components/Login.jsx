import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.jpg'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Login() {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": inputs.email,
      "password": inputs.password,
      "expiresIn": 600000
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3333/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.status === 'ok') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'success'
          }).then((value) => {
            localStorage.setItem('token', result.accessToken)
            navigate('/profile')
          })
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          })
        }
      })
      .catch((error) => console.error(error));

    console.log(inputs);
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
                <a href="/" className="logo">
                  <img src={Logo} alt="" />
                </a>
                <ul className="nav">
                  <li><Link to="/" className="active">Home</Link></li>
                  <li><Link to="/SearchRoom">Search Room</Link></li>
                  <li><Link to="/Contact">Contact Us</Link></li>
                  <li><Link to="/RoomDetails"><i className="fa fa-calendar"></i><span>Book Now</span></Link></li>
                </ul>
                <Link className='menu-trigger'>
                  <span>Menu</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="page-Login">
        <div className='container-Login'>
          <div className='wrapper'>
            <div className='logo'>
              <img src={Logo} alt="Logo" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className='input-box'>
                <label>Email :</label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='input-box'>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='remember-forgot'>
                <label>
                  <input type='checkbox' /> Remember me
                </label>
                <Link to="#">Forgot password?</Link>
              </div>

              <button type='submit' className='btn'>Login</button>

              <div className='register-link'>
                <p><Link to='/Register'>Register</Link></p>
              </div>
            </form>
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

export default Login
