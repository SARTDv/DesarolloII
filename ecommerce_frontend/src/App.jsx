import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register';
import axios from 'axios';

import StrideLayout from './components/StrideLayout';
import Search from "./pages/search"; 
import Home from './pages/home'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import Shop from './pages/shop'
import ProductDetails from './pages/productDetails'
import StrideLogin from './pages/strideLogin'


import ProtectedRoute from './components/RutaLogeada'; // Importa el componente de rutas protegidas

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
                {/* Rutas públicas */}
                <Route path="/login" element={<StrideLogin />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={<StrideLayout />}>
                    <Route index element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/productDetails" element={<ProductDetails />} />
                    
                    {/* Rutas protegidas */}
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
