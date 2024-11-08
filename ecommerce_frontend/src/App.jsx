import React from 'react';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';

import StrideLayout from './components/StrideLayout';
import Home from './pages/home'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import Shop from './pages/shop'
import ProductDetails from './pages/productDetails'
import StrideLogin from './pages/strideLogin'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/strideLogin" element={<StrideLogin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={<StrideLayout />}>
                    <Route index element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/productDetails" element={<ProductDetails />} />
                </Route>                
                </Routes>  
        </BrowserRouter>
    );
}

export default App;