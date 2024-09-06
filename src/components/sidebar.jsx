import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Sidebar.css'; // เพิ่มไฟล์ CSS สำหรับการจัดการรูปแบบ

const Sidebar = ({ isOpen, onClose, isLoggedIn, handleLogout }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      {isLoggedIn ? (
        <button className='btn' onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/Login">Login</Link>
      )}
      {/* ลิงค์หรือคอนเทนต์อื่น ๆ ที่ต้องการ */}
    </div>
  );
}

export default Sidebar;