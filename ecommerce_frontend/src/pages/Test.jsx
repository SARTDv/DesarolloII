import React from 'react';
import { useNavigate } from 'react-router-dom';

const Test = () => {
    const navigate = useNavigate();

    const handleProductClick = (id) => {
        // Guardar el ID del producto en localStorage
        localStorage.setItem('selectedProductId', id);
        // Navegar a la página de detalles
        navigate('/productDetails');
    };

    return (
        <div>
            <h1>Productos</h1>
            <button onClick={() => handleProductClick(1)}>Ver detalles del producto 1</button>
            <button onClick={() => handleProductClick(2)}>Ver detalles del producto 2</button>
        </div>
    );
};

export default Test;    
