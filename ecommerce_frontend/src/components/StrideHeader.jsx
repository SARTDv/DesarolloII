import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StrideHeader = () => {
   /*
    Esto es temporal hasta que se desarrolle la pagina de account
  */

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); 
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setIsLoggedIn(false); // Actualiza el estado a "no logueado"
        alert("Sesión cerrada correctamente");
    };


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
        {!isLoggedIn && (
                <div className="amado-btn-group mt-15 mb-30">
                <Link to={{ pathname: "/login", state: { activeLink: "signup" }}} className="btn amado-btn mb-15">Sign up</Link>
                <Link to={{ pathname: "/login", state: { activeLink: "signin" }}} className="btn amado-btn active">Sign in</Link>
              </div>
        )}        
        {/* Amado Nav */}
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
          {isLoggedIn && (
                <>
                    <a href="/cart" className="cart-nav">
                        <img src="img/core-img/cart.png" alt="Cart" /> Cart <span>(0)</span>
                    </a>
                    <a href="#" className="fav-nav">
                        <img src="img/core-img/favorites.png" alt="Favourite" /> Favourite
                    </a>
                    <a href="#" className="Acc-nav" onClick={handleLogout}>
                        <img src="img/core-img/account.png" alt="Account" /> Logout
                    </a>
                </>
          )}
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
