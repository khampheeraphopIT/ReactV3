import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import properties_01 from '../assets/images/property-01.jpg'
import properties_02 from '../assets/images/property-02.jpg'
import properties_03 from '../assets/images/property-03.jpg'
import properties_04 from '../assets/images/property-04.jpg'
import properties_05 from '../assets/images/property-05.jpg'
import properties_06 from '../assets/images/property-06.jpg'
import Logo from '../assets/images/logo.jpg'
import { Avatar } from '@mui/material';
import '../assets/css/Sidebar.css'
import Sidebar from '../components/sidebar'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const images = {
    'property-01.jpg': properties_01,
    'property-02.jpg': properties_02,
    'property-03.jpg': properties_03,
    'property-04.jpg': properties_04,
    'property-05.jpg': properties_05,
    'property-06.jpg': properties_06
};

const RoomDetails = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
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
    }, [MySwal, navigate])

    useEffect(() => {
        // Replace this with your actual data fetching logic
        const fetchRoomDetails = async () => {
            // Dummy data, replace with actual fetch
            const rooms = [
                { id: 1, type: 'single room', image: 'property-01.jpg', name: 'DELUXE VILLA', price: 3500, NumberOfRooms: 1, area: '15x15' },
                { id: 2, type: 'single room', image: 'property-02.jpg', name: 'PREMIER DULUXE VILLA', price: 4000, NumberOfRooms: 1, area: '15x17' },
                { id: 3, type: 'single room', image: 'property-03.jpg', name: 'POOL VILLA', price: 5000, NumberOfRooms: 1, area: '15x20' },
                { id: 4, type: 'double room', image: 'property-04.jpg', name: 'DELUXE VILLA', price: 6000, NumberOfRooms: 2, area: '20x20' },
                { id: 5, type: 'double room', image: 'property-05.jpg', name: 'PREMIER DELUXE VILLA', price: 6500, NumberOfRooms: 3, area: '25x25' },
                { id: 6, type: 'double room', image: 'property-06.jpg', name: 'POOL VILLA', price: 7500, NumberOfRooms: 4, area: '30x30' }
            ];
            const roomDetails = rooms.find(room => room.id === parseInt(roomId));
            setRoom(roomDetails);
        };

        fetchRoomDetails();
    }, [roomId]);

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div>
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
                            <h3>Room Details</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section propertie">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="item">
                                <div className='image-details'>
                                    <img src={images[room.image]} alt={room.name} />
                                    <div className='details'>
                                        <h3><i class="fa-solid fa-money-check-dollar"></i>Price: THB {room.price}</h3> <hr />
                                        <h3><i class="fa-solid fa-bed"></i>Number of rooms: {room.NumberOfRooms}</h3> <hr />
                                        <h3><i class="fa-solid fa-hotel"></i>Area: {room.area}</h3> <hr />
                                        <h3><i class="fa-solid fa-award"></i>Stay 2 Nights Extra Save 5%</h3> <hr />
                                    </div>
                                </div>
                                <div className='between'>
                                    <span>{room.type}</span>
                                    <button className='btn'><Link to='/Booking'>Book Now</Link></button>
                                </div>
                                <h1>{room.name}</h1> <hr /> <br />
                                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ad dicta iste eum atque obcaecati recusandae sit odit placeat enim architecto itaque odio provident consequatur commodi quas impedit, nulla voluptatem, distinctio veritatis? Sint sunt vitae velit recusandae natus officiis corporis. Ipsam quam soluta id provident iste voluptas harum rerum laborum fugit ut sed commodi voluptatibus impedit, sequi modi itaque possimus eos, accusamus minus nihil at, a porro fugiat omnis! Iste iure veritatis doloribus molestiae, quo ut impedit commodi quas similique nisi atque dolore quos non mollitia dolores sequi animi explicabo beatae rerum itaque rem autem maxime? Necessitatibus vel soluta libero.</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="container">
                    <div className="col-lg-12">
                        <p>© 2018 www.baraliresort.com. All rights reserved. </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default RoomDetails;
