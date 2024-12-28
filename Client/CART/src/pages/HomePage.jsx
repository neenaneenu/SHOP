import React, { Fragment, useEffect, useState } from 'react';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/userSlice'; 
import { addToCart } from "../Redux/cartSlice";
import { api } from '../axios';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.items || []);

    const { name, email, username, id } = useSelector((state) => state.user || {});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to fetch products!");
            }
        };
        fetchProducts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        dispatch(logoutUser());
        navigate("/");
    };

    const handleCart = () => {
        navigate("/cart");
    };

    const handleAddToCart = async (product) => {
        try{
            dispatch(addToCart(product));
       await api.post("/cart" , {product_id: product.id, user_id: id })
        
        toast.success(`${product.title} added to cart!`);
        }catch(err){
            console.log(err)
        }
    };

    const filteredProducts = products.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Fragment>
            <div>
                <div className="d-flex justify-content-between align-items-center m-1">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control"
                        style={{ width: '200px' }}
                    />
                    <button onClick={handleCart} className='btn btn-success d-flex align-items-center gap-2'>
                        <FaShoppingCart /> Cart
                    </button>
                    <button onClick={handleLogout} className='btn btn-success d-flex align-items-center gap-2'>
                        Logout
                    </button>
                </div>

                <div className='d-flex justify-content-center gap-2 flex-wrap mt-3'>
                    {filteredProducts.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        filteredProducts.map(product => (
                            <div key={product.id} style={{ width: "15rem" }} className="bg-light p-2">
                                <div>
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        style={{ width: "15rem", height: "10rem", objectFit: "cover" }}
                                    />
                                </div>
                                <div className='text-center'>
                                    <h6>{product.title}</h6>
                                    <div className='w-100 d-flex justify-content-between'>
                                        <div><FaStar /> {product.rating}</div>
                                        <div>
                                            <s className='text-muted'>${product.price}</s>
                                            ${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}
                                        </div>
                                    </div>
                                    <button onClick={() => handleAddToCart(product)} className='bg-danger p-1 w-100 mt-2 border-0 text-light rounded'>
                                        <FaShoppingCart /> Add To Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default HomePage;

