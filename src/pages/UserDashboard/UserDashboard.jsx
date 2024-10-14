import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './UserDashboard.css';

const UserDashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsRef = collection(db, 'products');
                const productsSnapshot = await getDocs(productsRef);
                const productsList = productsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsList);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="dashboard">
            <nav className="navbar">
                <div className="navbar-brand">FarmConnect</div>
                <ul className="navbar-menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/orders">My Orders</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>

            <section className="products-section">
                <h1 className="section-title">Farmers' Products</h1>
                <div className="products-container">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img src={product.imageUrl} alt={product.name} className="product-image1" />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">Price: ${product.price}</p>
                                <p className="product-quantity">Available: {product.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default UserDashboard;
