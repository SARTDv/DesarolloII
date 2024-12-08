// pagina para ejemplificar la creacionde una orden 


import React from "react";
import axios from "axios";

const TestOrderCreation = () => {
    const handleCreateOrder = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/orders/create/"
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
