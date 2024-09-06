import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../assets/css/styles.css';
import Logo from '../assets/images/logo.jpg';

function Register() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [inputs, setInputs] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));

        // รีเซ็ตข้อผิดพลาดเฉพาะเมื่อฟิลด์นั้นถูกแก้ไข
        if (event.target.name === 'email' && errors.email) {
            setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        }
    };

    const validate = () => {
        let errors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const specialCharsPattern = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g;

        if (!inputs.email) {
            errors.email = "Email is required.";
        } else if (!emailPattern.test(inputs.email)) {
            errors.email = "Invalid email format.";
        }

        if (!inputs.password) {
            errors.password = "Password is required.";
        } else {
            const passwordErrors = [];
            if (!/[A-Z]/.test(inputs.password)) passwordErrors.push("at least one uppercase letter");
            if (!/[a-z]/.test(inputs.password)) passwordErrors.push("at least one lowercase letter");
            if (!/\d/.test(inputs.password)) passwordErrors.push("at least one number");
            if ((inputs.password.match(specialCharsPattern) || []).length > 1)
                passwordErrors.push("at least three special characters");
            if (inputs.password.length < 8) passwordErrors.push("at least 8 characters long");

            if (passwordErrors.length > 0) {
                errors.password = `Password must include ${passwordErrors.join(', ')}.`;
            }
        }

        setErrors(errors);
        return errors;
    };

    const checkEmailExists = async (email) => {
        const response = await fetch('/register/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const result = await response.json();
        return result.exists;  // สมมติว่า API ส่งข้อมูลกลับมาเป็น { exists: true/false }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // ตรวจสอบการใช้งานอีเมลซ้ำ
        const emailExists = await checkEmailExists(inputs.email);
        if (emailExists) {
            setErrors((prevErrors) => ({ ...prevErrors, email: "Email is already registered." }));
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "fname": inputs.fname,
            "lname": inputs.lname,
            "email": inputs.email,
            "password": inputs.password,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("http://localhost:3333/register", requestOptions);
            const result = await response.json();
            if (result.status === 'ok') {
                MySwal.fire({
                    title: 'Register Success!',
                    icon: 'success',
                    confirmButtonText: 'Login Now!'
                }).then(() => {
                    navigate('/');
                });
            } else {
                MySwal.fire({
                    html: <i>{result.message}</i>,
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error(error);
            MySwal.fire({
                title: 'Error!',
                text: 'Something went wrong.',
                icon: 'error'
            });
        }
    };

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

            <div className="form-container">
                <form onSubmit={handleSubmit} className="register-form">
                    <h2>Register</h2>
                    <label>First name:
                        <input
                            type="text"
                            name="fname"
                            value={inputs.fname || ""}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </label>
                    <br />
                    <label>Last name:
                        <input
                            type="text"
                            name="lname"
                            value={inputs.lname || ""}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </label>
                    <br />
                    <label>Email:
                        <input
                            type="text"
                            name="email"
                            value={inputs.email || ""}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </label>
                    {errors.email && <p className="error-message">{errors.email}</p>}
                    <br />
                    <label>Password:
                        <input
                            type="password"
                            name="password"
                            value={inputs.password || ""}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </label>
                    {errors.password && <p className="error-message">{errors.password}</p>}
                    <br />
                    <input type="submit" className="form-submit" value="Register" />
                </form>
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

export default Register;
