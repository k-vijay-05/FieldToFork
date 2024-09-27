import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import SignUpSignIn from './components/SignUpSignIn/SignUpSignIn'


const FarmerDashboard = () => <h1>Farmer Dashboard</h1>;
const UserDashboard = () => <h1>User Dashboard</h1>;
const AdminDashboard = () => <h1>Admin Dashboard</h1>;

function App() {
  const router = createBrowserRouter([
   {
    path:"/",
    element:<SignUpSignIn/>,
   },
    {
      path:"/farmer-dashboard" ,
      element:<FarmerDashboard />,
    },
    {
      path:"/user-dashboard" ,
      element:<UserDashboard />,
    },
    {
      path:"/admin-dashboard" ,
      element:<AdminDashboard />,
    },
  
  ]);

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;

