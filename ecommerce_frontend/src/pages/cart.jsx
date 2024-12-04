import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const token_key = localStorage.getItem('token');

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/cart/Showcart/', 
                    { token_key: token_key }
                );
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const totalSum = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="cart-table-area section-padding-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="cart-title mt-50">
                            <h2>Shopping Cart</h2>
                        </div>

                        <div className="cart-table clearfix">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td className="cart_product_img">
                                                <a href="#"><img src="img/bg-img/cart1.jpg" alt="Product"/></a>
                                            </td>
                                            <td className="cart_product_desc">
                                                <h5>{item.product.name}</h5>
                                            </td>
                                            <td className="price">
                                                <span>${item.product.price}</span>
                                            </td>
                                            <td className="qty">
                                                <div className="qty-btn d-flex">
                                                    <p>Qty</p>
                                                    <div className="quantity">
                                                        <input type="number" className="qty-text" value={item.quantity} readOnly/>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <h5>Cart Total</h5>
                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>${totalSum}</span></li>
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>total:</span> <span>${totalSum}</span></li>
                            </ul>
                            <div className="cart-btn mt-100">
                                <a href="/checkout" className="btn amado-btn w-100">Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Cart;