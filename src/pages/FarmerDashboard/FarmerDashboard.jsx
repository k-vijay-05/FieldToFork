// src/components/FarmerDashboard.js
import React from 'react';
import Orders from '../../components/Farmer/Orders/Orders'
import AddProduct from '../../components/Farmer/AddProduct/AddProduct'
import EditProduct from '../../components/Farmer/EditProduct/EditProduct'
const FarmerDashboard = () => {

  return (
    <div className="container">
      <h2>Farmer Dashboard</h2>
      <Orders />
      <AddProduct />
      <EditProduct/>
    </div>
  );
};

export default FarmerDashboard;
