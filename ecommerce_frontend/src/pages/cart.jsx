import React from 'react';

const Cart = () => {

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
                                    <tr>
                                        <td className="cart_product_img">
                                            <a href="#"><img src="img/bg-img/cart1.jpg" alt="Product"/></a>
                                        </td>
                                        <td className="cart_product_desc">
                                            <h5>White Modern Chair</h5>
                                        </td>
                                        <td className="price">
                                            <span>$130</span>
                                        </td>
                                        <td className="qty">
                                            <div className="qty-btn d-flex">
                                                <p>Qty</p>
                                                <div className="quantity">
                                                    <span className="qty-minus" onclick="var effect = document.getElementById('qty'); var qty = parseInt(effect.value); if( !isNaN( qty ) && qty > 1 ) effect.value = qty - 1; return false;">
                                                        <i className="fa fa-caret-down" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="number" className="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1"/>
                                                    <span className="qty-plus" onclick="var effect = document.getElementById('qty'); var qty = parseInt(effect.value); if( !isNaN( qty )) effect.value = qty + 1; return false;">
                                                        <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="cart_product_img">
                                            <a href="#"><img src="img/bg-img/cart2.jpg" alt="Product"/></a>
                                        </td>
                                        <td className="cart_product_desc">
                                            <h5>Minimal Plant Pot</h5>
                                        </td>
                                        <td className="price">
                                            <span>$10</span>
                                        </td>
                                        <td className="qty">
                                            <div className="qty-btn d-flex">
                                                <p>Qty</p>
                                                <div className="quantity">
                                                    <span className="qty-minus" onclick="var effect = document.getElementById('qty'); var qty = parseInt(effect.value); if( !isNaN( qty ) && qty > 1 ) effect.value = qty - 1; return false;">
                                                        <i className="fa fa-caret-down" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="number" className="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1"/>
                                                    <span className="qty-plus" onclick="var effect = document.getElementById('qty'); var qty = parseInt(effect.value); if( !isNaN( qty )) effect.value = qty + 1; return false;">
                                                        <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="cart_product_img">
                                            <a href="#"><img src="img/bg-img/cart3.jpg" alt="Product"/></a>
                                        </td>
                                        <td className="cart_product_desc">
                                            <h5>Minimal Plant Pot</h5>
                                        </td>
                                        <td className="price">
                                            <span>$10</span>
                                        </td>
                                        <td className="qty">
                                            <div className="qty-btn d-flex">
                                                <p>Qty</p>
                                                <div className="quantity">
                                                    <span className="qty-minus" onclick="var effect = document.getElementById('qty'); var qty = parseInt(effect.value); if( !isNaN( qty ) && qty > 1 ) effect.value = qty - 1; return false;">
                                                        <i className="fa fa-caret-down" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="number" className="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1"/>
                                                    <span className="qty-plus" onclick="var effect = document.getElementById('qty'); var qty = parseInt(effect.value); if( !isNaN( qty )) effect.value = qty + 1; return false;">
                                                        <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <h5>Cart Total</h5>
                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>$140.00</span></li>
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>total:</span> <span>$140.00</span></li>
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