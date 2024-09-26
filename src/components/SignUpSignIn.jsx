import React, { useState } from 'react';
import axios from 'axios'; // This will be used for API requests
import { useHistory } from 'react-router-dom'; // To handle navigation

const SignUpSignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    farmName: '',
    location: '',
    role: 'user' // Default role is 'user'
  });
  
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign up and sign in
  const history = useHistory();

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
    try {
      // Adjust API endpoint based on sign-up or sign-in
      const endpoint = isSignUp ? 'http://localhost:5000/api/auth/signup' : 'http://localhost:5000/api/auth/signin';
      const response = await axios.post(endpoint, formData);

      // Store token or handle user redirection based on the role
      const userRole = response.data.role; // Assuming the role is sent back in the response
      localStorage.setItem('token', response.data.token); // Save token to local storage
      alert(`${isSignUp ? 'Sign-up' : 'Sign-in'} successful! Redirecting to ${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard.`);
      
      // Redirect based on user role
      if (userRole === 'farmer') {
        history.push('/farmer-dashboard'); // Redirect to Farmer Dashboard
      } else if (userRole === 'admin') {
        history.push('/admin-dashboard'); // Redirect to Admin Dashboard
      } else {
        history.push('/user-dashboard'); // Redirect to User Dashboard
      }
    } catch (error) {
      alert(`Error during ${isSignUp ? 'sign-up' : 'sign-in'}. Try again.`);
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
            <input
              type="text"
              name="farmName"
              placeholder="Farm Name"
              value={formData.farmName}
              onChange={handleChange}
              required={formData.role === 'farmer'}
            />
            <input
              type="text"
              name="location"
              placeholder="Farm Location"
              value={formData.location}
              onChange={handleChange}
              required={formData.role === 'farmer'}
            />
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
