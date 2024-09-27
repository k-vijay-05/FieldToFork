// src/components/SignUpSignIn.js
import React, { useState } from 'react';
import { auth, db } from '../../config/firebase'; // Firebase imports
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth functions
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore functions
import './SignUpSignIn.css';

const SignUpSignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    farmName: '',
    location: '',
    role: 'user' // Default role is 'user'
  });

  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and sign-in
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, farmName, location, role } = formData;

    try {
      if (isSignUp) {
        // Firebase Sign-Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Store additional info in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name,
          farmName: role === 'farmer' ? farmName : null,
          location: role === 'farmer' ? location : null,
          role,
        });

        alert('Sign-up successful!');
      } else {
        // Firebase Sign-In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        const userData = userDoc.data();
        alert('Sign-in successful!');
      }

      // Redirect based on role
      if (role === 'farmer') {
        navigate('/farmer-dashboard');
      } else if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }

    } catch (error) {
      alert(`Error during ${isSignUp ? 'sign-up' : 'sign-in'}: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {formData.role === 'farmer' && (
              <>
                <input
                  type="text"
                  name="farmName"
                  placeholder="Farm Name"
                  value={formData.farmName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Farm Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </>
            )}
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <div>
          <label>
            <input
              type="radio"
              value="farmer"
              checked={formData.role === 'farmer'}
              onChange={handleRoleChange}
            />
            Farmer
          </label>
          <label>
            <input
              type="radio"
              value="user"
              checked={formData.role === 'user'}
              onChange={handleRoleChange}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={handleRoleChange}
            />
            Admin
          </label>
        </div>

        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default SignUpSignIn;
