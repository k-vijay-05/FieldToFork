import React, { useState } from 'react';
import { db, storage } from '../../../config/firebase'; // Firebase Firestore and Storage
import { addDoc, collection } from 'firebase/firestore'; // Firestore functions
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions
import './AddProduct.css'; // Add styles here or create a new CSS file
import { useContext } from 'react';
import {Context} from '../../../context/AuthContext'
const AddProduct = () => {
  const { user } = useContext(Context);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
    imageUrl: '',
    email:user.email
  });

  const [imageFile, setImageFile] = useState(null); // Store the image file
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]); // Store the image file for upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFile) {
      const storageRef = ref(storage, `products/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      // Monitor upload progress
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          alert('Error uploading image: ' + error.message);
        },
        async () => {
          // Upload complete, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setProductData({ ...productData, imageUrl: downloadURL });

          // Add product data to Firestore along with the image URL
          try {
            await addDoc(collection(db, 'products'), { ...productData, imageUrl: downloadURL });
            alert('Product added successfully!');
            setProductData({
              name: '',
              price: '',
              description: '',
              quantity: '',
              imageUrl: '',
            });
            setImageFile(null);
            setUploadProgress(0);
          } catch (error) {
            alert('Error adding product: ' + error.message);
          }
        }
      );
    } else {
      alert('Please select an image');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter product description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          {uploadProgress > 0 && (
            <div className="progress-bar">
              <div style={{ width: `${uploadProgress}%` }} className="progress"></div>
            </div>
          )}
        </div>
        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
