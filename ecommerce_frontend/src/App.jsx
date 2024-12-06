import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import StrideLayout from './components/StrideLayout';
import Search from "./pages/search"; 
import Home from './pages/home'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import Shop from './pages/shop'
import ProductDetails from './pages/productDetails'
import StrideLogin from './pages/strideLogin'
import { AuthProvider, AuthContext } from './components/AuthToken';

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

const AppContent = () => {
    const { isLoggedIn } = useContext(AuthContext); 

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<StrideLogin />} />
                <Route path="/" element={<StrideLayout />}>
                    <Route index element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home key={isLoggedIn} />} /> 
                    <Route path="/search" element={<Search />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/productDetails" element={<ProductDetails />} />
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
        </Router>
    );
};

const App = () => (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
);

export default App;