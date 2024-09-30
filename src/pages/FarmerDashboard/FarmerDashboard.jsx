import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './FarmerDashboard.css';
import Orders from '../../components/Farmer/Orders/Orders'
import AddProduct from '../../components/Farmer/AddProduct/AddProduct'
// import Products from '../../components/Farmer/Products/';
// import Overview from './Overview';
// import Settings from './Settings';

const FarmerDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <div className="top-navbar">
        <div className="dashboard-title">Farmer Dashboard</div>
        <div className="navbar-right">
          <div className="notifications-icon">🔔</div>
          <div className="profile-icon">👤</div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          {/* <li><Link to="/">Home/Overview</Link></li> */}
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/add">add product</Link></li>
          {/* <li><Link to="/settings">Settings</Link></li> */}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <Routes>
          {/* <Route path="/" element={<Overview />} /> */}
          {/* <Route path="/orders" element={<Orders />} /> */}
          <Route path="/add" element={<AddProduct/>} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default FarmerDashboard;
