import React from 'react';
import styles from '../../css/admin.module.css';

const mockOrders = [
  {
    id: 'ORD001',
    username: 'john_doe',
    total: 299.99,
    date: '2024-03-15'
  },
  {
    id: 'ORD002',
    username: 'jane_smith',
    total: 149.50,
    date: '2024-03-14'
  }
];

export function UserOrders() {
  return (
    <div>
      <h2>User Orders</h2>
      
      <div className={styles["table-container"]}>
        <table className={styles["data-table"]}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Username</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.username}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}