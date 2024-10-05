import React, { useEffect, useState } from 'react';
import { db, storage } from '../../../config/firebase'; // Firebase Firestore and Storage
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css'; // Import CSS

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
    imageUrl: ''
  });
  const [newImage, setNewImage] = useState(null); // Store new image file
  const [loading, setLoading] = useState(true);

  // Fetch product data based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, 'products', id);
        const productSnap = await getDoc(productDoc);

        if (productSnap.exists()) {
          setProductData(productSnap.data());
          setLoading(false);
        } else {
          console.log('No such document!');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update product data
      const productDocRef = doc(db, 'products', id);

      if (newImage) {
        // If there's a new image, upload it to Firebase Storage
        const imageRef = ref(storage, `productImages/${newImage.name}`);
        await uploadBytes(imageRef, newImage);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(productDocRef, {
          ...productData,
          imageUrl // Update product with new image URL
        });
      } else {
        // Update the product without changing the image
        await updateDoc(productDocRef, productData);
      }

      alert('Product updated successfully!');
      navigate('/manage');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  if (loading) {
    return <div>Loading product...</div>;
  }

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
        <textarea
          name="description"
          placeholder="Product Description"
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

        {/* Current Image Display */}
        {productData.imageUrl && (
          <div className="image-preview">
            <img src={productData.imageUrl} alt={productData.name} />
            <p>Current Image</p>
          </div>
        )}

        {/* New Image Upload */}
        <label htmlFor="newImage">Upload New Image</label>
        <input
          type="file"
          id="newImage"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
