import React, { useState } from 'react';
import { Package, CheckCircle, CircleX } from 'lucide-react';
import styles from '../css/orders.module.css'; // Importar el archivo CSS modular

const OrderPage = () => {
    const Ordenes = [
        {
          id: '1',
          FirstProductImageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a710787c-70eb-489b-a37a-8c5d3d0f3fc2/AIR+MAX+DN.png',
          status: 'pending',
          packageQty: 5,
          Totalprice: 500,
          orderDate: '2024-03-16',
        },
        {
          id: '2',
          FirstProductImageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2aecf220-1477-4a70-9070-56216a01264b/NIKE+DUNK+LOW+RETRO.png',
          status: 'pending',
          packageQty: 2,
          Totalprice: 200,
          orderDate: '2024-03-14',
        },
        {
          id: '3',
          FirstProductImageUrl: 'https://nikeclprod.vtexassets.com/arquivos/ids/699188/DN3577_002_A_PREM.jpg?v=638170066699730000',
          status: 'delivered',
          packageQty: 1,
          Totalprice: 50,
          orderDate: '2024-03-13',
        },
      ];

  const [orders, setOrders] = useState(Ordenes);

  const handleMarkAsDelivered = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'delivered' }
        : order
    ));
  };
  
  const handleMarkAsCanceled = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'canceled' }
        : order
    ));
  };

  return (
    <>
      <div className={styles["orders-container"]}>
        <div className={styles["orders-content"]}>
          <div className={styles["orders-header"]}>
            <Package size={32} className={styles["orders-icon"]} />
            <h1 className={styles["orders-title"]}>My Orders</h1>
          </div>

          <div className={styles["orders-list"]}>
            {orders.map((order) => (
              <div key={order.id} className={styles["order-card"]}>
                <div className={styles["order-content"]}>
                  <div className={styles["order-image-container"]}>
                    <img
                      src={order.FirstProductImageUrl}
                      alt=""
                      className={styles["order-image"]}
                    />
                  </div>

                  <div className={styles["order-details"]}>
                    <div className={styles["order-title"]}>
                      <h3 className={styles["order-name"]}>Order Date: {new Date(order.orderDate).toLocaleDateString()}</h3>
                    </div>

                    <div className={styles["order-info"]}>
                      <div className={styles["order-date"]}>
                        <Package size={18} />
                        <span>
                          Package quantity: {order.packageQty} 
                        </span>
                      </div>

                      <div className={styles["order-status"]}>
                        <span className={styles["status-label"]}>Status:</span>
                        <span className={`${styles["status-value"]} ${styles[order.status]}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className={styles["order-id"]}>
                      <span>
                          Order Id: {order.id} 
                        </span>
                    </div>

                    <div className={styles["order-actions"]}>
                      <div>
                        <span className={styles["order-price"]}>
                          Total amount: ${order.Totalprice}
                        </span>
                      </div>
                      <div className={styles["right-divs"]}>
                        {order.status === 'pending' && (
                          <>
                          <button
                            onClick={() => handleMarkAsDelivered(order.id)}
                            className={styles["mark-received-btn"]}
                          >
                            <CheckCircle size={18} />
                            Mark as Received
                          </button>

                          <button
                          onClick={() => handleMarkAsCanceled(order.id)}
                          className={styles["mark-canceled-btn"]}
                          >
                          <CircleX size={18} />
                          Cancel this Order
                          </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;
