import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Checkout = () => {
  const prod = [
    {
      name: "Zapas nike",
      Qty: 1,
      price: 100,
      
    },
    {
      name: "maquina de guerra",
      Qty: 1,
      price: 120,
      
    },
    {
      name: "cordones",
      Qty: 2,
      price: 10,      
    },
  ];

    const [pendingOrder, setPendingOrder] = useState(null);     
    const [hasPendingOrders, setHasPendingOrders] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });

    const [shipInfo, setShipInfo] = useState({
      firstName: "",
      lastName: "",
      address: "",
      town: "",
      zipCode: "",
      phoneNum: "",
      com: "",
    });
                                                                    // ajustar la payment infor
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
      };

      const handleShipChange = (e) => {
        const { name, value } = e.target;
        setShipInfo({ ...shipInfo, [name]: value });
      };
    
      const handlePayment = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/orders/process-payment/",
            { payment_info: paymentInfo }
          );
          toast.success(response.data.message);
        } catch (error) {
          console.error("Error processing payment:", error.response || error.message);
          toast.error("Error procesando el pago: " + (error.response?.data.error || error.message));
        }
      };
      
    

      useEffect(() => {
        const checkPendingOrders = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/orders/check-pending/');
            setHasPendingOrders(response.data.has_pending);

    
            if (response.data.has_pending) {
              setPendingOrder(response.data.order); // Guarda la orden en el estado imprimir para ver
            } else {
              toast.info("No tienes órdenes pendientes.");
              navigate('/cart'); 
            }
          } catch (error) {
            console.error('Error checking pending orders:', error);
            toast.error('Error checking orders.');
            navigate('/cart'); // Redirigir al carrito en caso de error
          } finally {
            setLoading(false); // Termina el estado de carga
          }
        };
    
        checkPendingOrders();
      }, [navigate]);

    if (!hasPendingOrders) {
        // Mientras verifica, puede mostrar un indicador de carga o simplemente nada
        return null;
    }

    return (
        <div className="cart-table-area section-padding-100">
            {/* Contenido de la página */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="checkout_details_area mt-50 clearfix">
                            <div className="cart-title">
                                <h2>Checkout</h2>
                            </div>
                                <form>
                                    <div class="row">
                                        <div class="col-12 mb-3">
                                            <input type="number" class="form-control" name="cardNumber" placeholder="Card Number" value={paymentInfo.cardNumber} onChange={handleInputChange} required/>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <input type="text" class="form-control" placeholder="Expity Date" name="expiryDate" value={paymentInfo.expiryDate} onChange={handleInputChange} required/>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <input type="number" class="form-control" placeholder="CVV" name="cvv" value={paymentInfo.cvv} onChange={handleInputChange} required/>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <input type="text" class="form-control" name="firstName" value={shipInfo.firstName} placeholder="First Name" onChange={handleShipChange} required/>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <input type="text" class="form-control" name="lastName" value={shipInfo.lastName} placeholder="Last Name" onChange={handleShipChange} required/>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <input type="text" class="form-control" name="address" placeholder="Address" value={shipInfo.address} onChange={handleShipChange} required/>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <input type="text" class="form-control" name="town" placeholder="Town" value={shipInfo.town} onChange={handleShipChange} />
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <input type="text" class="form-control" name="zipCode" placeholder="Zip Code" value={shipInfo.zipCode} onChange={handleShipChange} required/>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <input type="number" class="form-control" name="phoneNum" min="0" placeholder="Phone No" value={shipInfo.phoneNum} onChange={handleShipChange}/>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <textarea name="com" value={shipInfo.com} class="form-control w-100" cols="30" rows="10" placeholder="Leave a comment about your order" onChange={handleShipChange}></textarea>
                                        </div>
                                    </div>
                                </form>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <h5>Cart Total</h5>
                            <ul className="product-table">
                                {prod.map((producto) => (
                                  <li key={producto.id} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>{producto.Qty}x {producto.name}</span>
                                    <span>${producto.Qty * producto.price}</span>
                                  </li>
                                ))}
                            </ul>
                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>${pendingOrder.total_price}</span></li>
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>total:</span> <span>${pendingOrder.total_price}</span></li>
                            </ul>
                            <div className="cart-btn mt-50">
                              <button 
                                  className="btn amado-btn w-100" 
                                  onClick={handlePayment}  // Aquí llamamos a handlePayment cuando se haga clic
                              >
                                  Pay
                              </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            {/* Alertas de las mas alta calidddddaa */}
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />
            </div>
        </div>
    );
};

export default Checkout;
