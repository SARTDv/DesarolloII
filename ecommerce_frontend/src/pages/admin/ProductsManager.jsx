import React, { useState } from 'react';
import { ProductForm } from './ProductForm';
import { ProductList } from './ProductList';
import styles from '../../css/admin.module.css';

export function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === product.id ? product : p
      ));
    } else {
      setProducts([...products, { ...product, id: Date.now().toString() }]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className={styles["products-manager"]}>
      <div className={styles["header-actions"]}>
        <h2>Product Management</h2>
        <button 
          className={`${styles.btn} ${styles["btn-primary"]}`}
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          Add New Product
        </button>
      </div>

      {showForm ? (
        <ProductForm 
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      ) : (
        <ProductList 
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}