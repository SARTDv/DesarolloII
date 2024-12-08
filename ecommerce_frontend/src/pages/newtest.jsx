// pagina para ejemplificar la creacionde una orden 


import React from "react";
import axios from "axios";

const TestOrderCreation = () => {
    const handleCreateOrder = async () => {
        const token = localStorage.getItem("token"); // Reemplázalo si usas otra forma de manejar tokens

        // Datos de la orden
        const orderData = {
            user: 1, // ID del usuario autenticado, ajusta según sea necesario
            shippingaddress: "123 Main St, Springfield",
            order_items: [
                { product: 1, quantity: 2 }, // IDs y cantidades de productos
                { product: 2, quantity: 1 },
            ],
        };

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/orders/create/",
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            alert("Order created successfully: " + response.data.message);
        } catch (error) {
            console.error("Error creating order:", error.response ? error.response.data : error);
            alert("Error creating order: " + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Test Order Creation</h1>
            <button
                onClick={handleCreateOrder}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                }}
            >
                Create Order
            </button>
        </div>
    );
};

export default TestOrderCreation;
