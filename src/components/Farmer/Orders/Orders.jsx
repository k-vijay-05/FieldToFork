// src/components/Orders.js
import React, { useEffect, useState } from 'react';
import { db } from '../../../config/firebase'; // Import Firebase Firestore
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from Firestore
    const fetchOrders = async () => {
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Product:</strong> {order.productName}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Total:</strong> ${order.totalPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
