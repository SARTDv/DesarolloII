import React from 'react';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import styles from '../../css/admin.module.css';

export function Analytics() {
  const GrowthRate = -5.2;
  const respuestaPosible = {
      TotalRevenue: 5200,
      TotalOrders: 420,
      status: 'pending',
      TotalCustomers: 150,
      Totalprice: 500,      
    }
  

  return (
    <div>
      <h2>Sales Analytics</h2>
      
      <div className={styles["stats-grid"]}>
        <div className={styles["stat-card"]}>
          <DollarSign color="#0e5a9b" />
          <h3>Total Revenue</h3>
          <p>${respuestaPosible.TotalRevenue}</p>
        </div>
        
        <div className={styles["stat-card"]}>
          <ShoppingCart color="#0e5a9b" />
          <h3>Total Orders</h3>
          <p>{respuestaPosible.TotalOrders}</p>
        </div>
        
        <div className={styles["stat-card"]}>
          <Users color="#0e5a9b" />
          <h3>Total Customers</h3>
          <p>{respuestaPosible.TotalCustomers}</p>
        </div>
        
        <div className={`${styles["growth-card"]} ${GrowthRate >= 0 ? styles["positive"] : styles["negative"]}`}>
          <TrendingUp color="#0e5a9b" />
          <h3>Growth Rate</h3>
          <p>{GrowthRate >= 0 ? `+${GrowthRate}%` : `${GrowthRate}%`}</p>
        </div>
      </div>

      <div className={styles["chart-container"]}>
        <h3>Monthly Sales</h3>
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Chart placeholder - Monthly sales data visualization
        </div>
      </div>
    </div>
  );
}