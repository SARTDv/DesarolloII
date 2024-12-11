import React from 'react';
import { LayoutDashboard, Package, Users, BarChart } from 'lucide-react';
import styles from '../../css/admin.module.css';

export function Sidebar({ activeSection, onNavigate, isOpen }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.active : ''}`}>
      <h2>Admin Panel</h2>
      <nav className={styles["sidebar-nav"]}>
        <div
          className={`${styles["nav-item"]} ${activeSection === 'dashboard' ? styles.active : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>
        <div
          className={`${styles["nav-item"]} ${activeSection === 'products' ? styles.active : ''}`}
          onClick={() => onNavigate('products')}
        >
          <Package size={20} />
          <span>Products</span>
        </div>
        <div
          className={`${styles["nav-item"]} ${activeSection === 'orders' ? styles.active : ''}`}
          onClick={() => onNavigate('orders')}
        >
          <Users size={20} />
          <span>User Orders</span>
        </div>
        <div
          className={`${styles["nav-item"]} ${activeSection === 'analytics' ? styles.active : ''}`}
          onClick={() => onNavigate('analytics')}
        >
          <BarChart size={20} />
          <span>Analytics</span>
        </div>
      </nav>
    </div>
  );
}
