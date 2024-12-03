import React from 'react';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import axios from 'axios';

import StrideLayout from './components/StrideLayout';
import Search from "./pages/search"; 
import Home from './pages/home'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import Shop from './pages/shop'
import ProductDetails from './pages/productDetails'
import StrideLogin from './pages/strideLogin'



// Interceptor para agregar el token en los encabezados de todas las solicitudes
axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken'); // Obtener el token del almacenamiento local
      if (token) {
        config.headers.Authorization = `Token ${token}`; // Agregar el token al encabezado de la solicitud
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
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
                    <Route path="/search" element={<Search />} />
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