import React from 'react';
import { Link } from 'react-router-dom';
import '../css/core-style.css'

const StrideHeader = () => {

  return (
    <>
    <div className="mobile-nav">
      <div className="amado-navbar-brand">
        <a href="/home">
          <img src="img/core-img/logo.png" alt="Logo" />
        </a>
        </div>
          {/* Navbar Toggler CORREGIR*/}
        <div className="amado-navbar-toggler">
          <span></span><span></span><span></span>
        </div>
      </div>
    <header className="header-area clearfix">
        <div className="nav-close">
          <i className="fa fa-close" aria-hidden="true"></i>
        </div>
        {/* Logo */}
        <div className="logo">
          <a href="/home">
            <img src="img/core-img/logo.png" alt="Logo" />
          </a>
        </div>
        {/* Button Group */}
        <div className="amado-btn-group mt-15 mb-30">
          <Link to="/register" className="btn amado-btn mb-15">Sign up</Link>
          <a href="/login" className="btn amado-btn active">Sign in</a>
        </div>
        {/* Amado Nav <li><Link to="/cart">Cart</Link></li> */}
        <nav className="amado-nav">
          <ul>
            <li className="active"><a href="/home">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/productDetails">Product</a></li>
            <li><a href="/checkout">Checkout</a></li>
          </ul>
        </nav>
        {/* Cart Menu */}
        <div className="cart-fav-search mb-30">
          <a href="#" className="Acc-nav">
            <img src="img/core-img/account.png" alt="Account" /> Account
          </a>
          <a href="/cart" className="cart-nav">
            <img src="img/core-img/cart.png" alt="Cart" /> Cart <span>(0)</span>
          </a>
          <a href="#" className="fav-nav">
            <img src="img/core-img/favorites.png" alt="Favourite" /> Favourite
          </a>
        </div>
        {/* Social Button */}
        <div className="social-info d-flex justify-content-between">
          <a href="#">
            <i className="fa fa-pinterest" aria-hidden="true"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="#">
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a>
        </div>
      </header></>
  );
};

export default StrideHeader;
