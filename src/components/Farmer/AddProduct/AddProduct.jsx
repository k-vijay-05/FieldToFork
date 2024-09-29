// src/components/AddProduct.js
import React, { useState } from 'react';
import { db } from '../../../config/firebase'; // Firebase Firestore
import { addDoc, collection } from 'firebase/firestore'; // Firestore functions

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add product to Firestore
      await addDoc(collection(db, 'products'), productData);
      alert('Product added successfully!');
    } catch (error) {
      alert('Error adding product: ' + error.message);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={productData.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
