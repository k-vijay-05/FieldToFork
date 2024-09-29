// src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore functions

const EditProduct = ({ productId }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = await getDoc(doc(db, 'products', productId));
      if (productDoc.exists()) {
        setProductData(productDoc.data());
      } else {
        alert('Product not found!');
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update product in Firestore
      await updateDoc(doc(db, 'products', productId), productData);
      alert('Product updated successfully!');
    } catch (error) {
      alert('Error updating product: ' + error.message);
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
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
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
