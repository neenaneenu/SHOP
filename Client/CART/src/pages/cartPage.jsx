import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateCartQuantity } from '../Redux/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items || []);
    const navigate = useNavigate()

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
        toast.success('Item removed from cart!');
    };

    const handleUpdateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            handleRemoveItem(productId);
        } else {
            dispatch(updateCartQuantity({ productId, quantity }));
            toast.success('Cart updated successfully!');
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const discountedPrice = item.price - (item.price * (item.discountPercentage / 100));
            return total + discountedPrice * item.quantity;
        }, 0).toFixed(2);
    };

    const handleHome = () => {
        navigate("/Home")
    }

    return (
        <Fragment>
            <div>
                <h2 className="text-center">Your Cart</h2>
                {cart.length === 0 ? (
                    <div className="text-center mt-4">
                        <p>Your cart is empty!</p>
                        <Link to="/Home" className="btn btn-primary">Go Shopping</Link>
                    </div>
                ) : (
                    <div className="container">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => {
                                    const discountedPrice = item.price - (item.price * (item.discountPercentage / 100));
                                    return (
                                        <tr key={item.id}>
                                            <td>
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    style={{ width: '5rem', height: '5rem', objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td>{item.title}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                                    className="form-control"
                                                    style={{ width: '4rem' }}
                                                />
                                            </td>
                                            <td>${discountedPrice.toFixed(2)}</td>
                                            <td>${(discountedPrice * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="btn btn-danger"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="text-end">
                            <h4>Total: ${calculateTotal()}</h4>
                            
                        </div>
                        <button onSubmit={handleHome} className="btn btn-success">Back to home</button>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default CartPage
