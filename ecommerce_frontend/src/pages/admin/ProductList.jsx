import React from 'react';
import styles from '../../css/admin.module.css';

export function ProductList({ products, onEdit, onDelete }) {
  const ProductList = [
    {
      id: '11',
      name: 'hola',
      price: 100,
      stock: 32,
    },
    {
      id: '12',
      name: 'zapas',
      price: 500,
      stock: 32,
    }
  ];
  return (
    <div className={styles["table-container"]}>
      <table className={styles["data-table"]}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ProductList.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td className={styles["action-buttons"]}>
                <button
                  onClick={() => onEdit(product)}
                  className={`${styles["btn"]} ${styles["btn-secondary"]}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className={`${styles["btn"]} ${styles["btn-primary"]}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}