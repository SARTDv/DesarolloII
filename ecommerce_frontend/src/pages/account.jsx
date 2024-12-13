import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Settings, House } from 'lucide-react';
import styles from '../css/account.module.css'
import { AuthContext } from '../components/AuthToken';

function AccountPage() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutAndRedirect = () => {
    handleLogout();
    navigate('/home');
  };
  const handleAdminClick = () => {
    navigate('/admin');
  };  

  const [isSuperuser, setIsSuperuser] = useState(false);
  //Cuando se hace la solicitud setIsSuperuser(response.data.isSuperuser);

  const posibleRta = {
    Username: "john Doe",
    Email: "john.doe@example.com",
    isAdmin: true,
  }

  useEffect(() => {
    setIsSuperuser(posibleRta.isAdmin)
    console.log("Se renderiza")
  }, []); // Se ejecuta lo que sea que este dentro una vez se renderiza

  
  return (
    <div className={styles["account-container"]}>
      <div className={styles["account-card"]}>
        <h1 className={styles["title"]}>My Account</h1>
        
        <div className={styles["content"]}>
          <div className={styles["avatar-container"]}>
            <div className={styles["avatar"]}>
              <span>{posibleRta.Username.charAt(0).toLocaleUpperCase()}</span>
            </div>
          </div>

          <div className={styles["info-section"]}>
            <div className={styles["info-group"]}>
              <label>Username</label>
              <div className={styles["info-box"]}>{posibleRta.Username}</div>
            </div>

            <div className={styles["info-group"]}>
              <label>Email</label>
              <div className={styles["info-box"]}>{posibleRta.Email}</div>
            </div>
          </div>
            <div className={styles["button-group"]}>
                    {isSuperuser ? (
                        <button
                            onClick={handleAdminClick}
                            className={`${styles["btn"]} ${styles["btn-primary"]}`}
                        >
                            <Settings size={20} />
                            <span>Admin</span>
                        </button>

                        ) : (
                        <button
                        className={`${styles["btn"]} ${styles["btn-primary"]}`}
                        onClick={() => {
                            window.location.href = "/home";
                        }}
                        >
                            <House size={20}/>
                            <span>Home</span>
                        </button>
                )}
            <button
              onClick={logoutAndRedirect}
              className={`${styles["btn"]} ${styles["btn-outline"]}`}
            >
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;