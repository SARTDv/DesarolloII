import React, { useState } from 'react';
import { Package, CheckCircle } from 'lucide-react';
import styles from '../css/orders.module.css'; // Importar el archivo CSS modular

const OrderPage = () => {
    const Ordenes = [
        {
          id: '1',
          productName: 'Basura',
          imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a710787c-70eb-489b-a37a-8c5d3d0f3fc2/AIR+MAX+DN.png',
          status: 'pending',
          price: 100,
          orderDate: '2024-03-15',
        },
        {
          id: '2',
          productName: 'Nike Low',
          imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2aecf220-1477-4a70-9070-56216a01264b/NIKE+DUNK+LOW+RETRO.png',
          status: 'pending',
          price: 200,
          orderDate: '2024-03-14',
        },
        {
          id: '3',
          productName: 'Nike mid',
          imageUrl: 'https://nikeclprod.vtexassets.com/arquivos/ids/699188/DN3577_002_A_PREM.jpg?v=638170066699730000',
          status: 'delivered',
          price: 50,
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
                      src={order.imageUrl}
                      alt={order.productName}
                      className={styles["order-image"]}
                    />
                  </div>

                  <div className={styles["order-details"]}>
                    <div className={styles["order-title"]}>
                      <h3 className={styles["order-name"]}>{order.productName}</h3>
                    </div>

                    <div className={styles["order-info"]}>
                      <div className={styles["order-date"]}>
                        <Package size={18} />
                        <span>
                          Order Date: {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className={styles["order-status"]}>
                        <span className={styles["status-label"]}>Status:</span>
                        <span className={`${styles["status-value"]} ${styles[order.status]}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className={styles["order-actions"]}>
                      <span className={styles["order-price"]}>
                        ${order.price}
                      </span>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleMarkAsDelivered(order.id)}
                          className={styles["mark-received-btn"]}
                        >
                          <CheckCircle size={18} />
                          Mark as Received
                        </button>
                      )}
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
