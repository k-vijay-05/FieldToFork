// src/components/UserDashboard/UserDashboard.js
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
// import Profile from './Profile';
// import OrderHistory from './OrderHistory';
// import Favorites from './Favorites';
// import Settings from './Settings';
import './UserDashboard.css'; // Add styles for layout

const UserDashboard = () => {
    return (
        <div className="dashboard-container">
            {/* Sidebar for navigation */}
            <div className="sidebar">
                <ul>
                    <li><Link to="/user/profile">Profile</Link></li>
                    <li><Link to="/user/orders">Order History</Link></li>
                    <li><Link to="/user/favorites">Favorites</Link></li>
                    <li><Link to="/user/settings">Settings</Link></li>
                </ul>
            </div>
            
            {/* Main content area */}
            <div className="main-content">
                {/* <Routes> */}
                    {/* <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes> */}
            </div>
        </div>
    );
};

export default UserDashboard;
