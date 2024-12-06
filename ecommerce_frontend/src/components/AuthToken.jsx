import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); 
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false); // Actualiza el estado a "no logueado"
        alert("Sesión cerrada correctamente");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLogout, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};
