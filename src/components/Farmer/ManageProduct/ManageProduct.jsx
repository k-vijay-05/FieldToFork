import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../config/firebase'; // Firestore and Firebase Auth
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Firestore functions
import { onAuthStateChanged } from 'firebase/auth'; // Firebase auth
import './ManageProduct.css'; // Add styles for the card layout
import { useNavigate } from 'react-router-dom';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();

    // Handle Edit navigation
    const handleEdit = (productId) => {
        navigate(`/edit-product/${productId}`);
    };

    // Handle Delete product
    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, 'products', productId));
                setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
                alert('Product deleted successfully');
            } catch (error) {
                console.error('Error deleting product: ', error);
                alert('Failed to delete the product');
            }
        }
    };

    // Fetch authenticated user and products based on their email
    useEffect(() => {
        const fetchUserAndProducts = async () => {
            // Listen for auth state changes to get current user
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const email = user.email;
                    setUserEmail(email);

                    try {
                        // Firestore query to fetch products based on user email
                        const productsRef = collection(db, 'products');
                        const q = query(productsRef, where('email', '==', email));
                        const querySnapshot = await getDocs(q);

                        // Map over the fetched documents and store product data
                        const fetchedProducts = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setProducts(fetchedProducts);
                        setLoading(false);
                    } catch (error) {
                        console.error('Error fetching products: ', error);
                        setLoading(false);
                    }
                } else {
                    console.log('No user is signed in');
                    setLoading(false);
                }
            });
        };

        fetchUserAndProducts();
    }, []);

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <div className="manage-products-container">
            {products.length === 0 ? (
                <div>No products found for {userEmail}.</div>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <div className="card-header">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="product-price">{product.price}</p>
                                <p className="product-description">{product.description}</p>
                                <p className="product-quantity">Quantity: {product.quantity}</p>
                            </div>
                            <div className="card-actions">
                                <button className="edit-btn" onClick={() => handleEdit(product.id)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageProduct;
