import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import styles from '../css/strideLogin.module.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../components/AuthToken';

function Login() {
    const { isLoggedIn, setIsLoggedIn  } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            alert("Ya has iniciado sesión.");
            navigate("/home");
        }
    }, [isLoggedIn, navigate]);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
      };
    
    const handleRegister = async (e) => {

        e.preventDefault();
        setError(null);
        if (!captchaValue) {
            alert("por favor complete el captcha")
            return;
          }
          const data = {
            username,
            password,
            'g-recaptcha-response': captchaValue,
            email,
          };

        try {
            const response = await axios.post('http://localhost:8000/api/accounts/register/', data);
            setSuccess(true);
            console.log("Usuario registrado:", response.data);
            alert("Registro exitos, ya pudes iniciar sesion");
        } catch (error) {
            setError("Hubo un error al registrar el usuario");
            console.error("Error en el registro:", error);
        }
    };

    const handleLogin = async (e) => {

        e.preventDefault();
        setError(null);
        if (!captchaValue) {
            alert("por favor complete el capthca")
            return;
          }
        try {
            const response = await axios.post('http://localhost:8000/api/accounts/login/', { //Quiero cambiar esto
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token); // Guardar el token en el almacenamiento local
            alert("Inicio de sesión exitoso");
            setIsLoggedIn(true);
            navigate("/home");

            //-----------setActiveButton("log");
        } catch (error) {
            setError("Credenciales inválidas");
        }
    };

    // Define el estado
    const [activeLink, setActiveLink] = useState("signup");

    const [activeButton, setActiveButton] = useState("vacio");
    const ButtonSignIn = () => { setActiveButton("log"); }; 
    const ButtonSignUp = () => { setActiveButton("reg"); };

    const frameClass = activeButton === "vacio" ? (activeLink === "signin" ? styles["frame"] : styles["frame-long"]) : styles["frame-short"];
    const formSignUp = activeButton === "vacio" ? (activeLink === "signup" ? styles["form-signup-left"] : styles["form-signup"]) : styles["form-signup-down"];

    // Funciones de manejo de clics 
    const handleClickSignIn = () => { setActiveLink("signin"); }; 
    const handleClickSignUp = () => { setActiveLink("signup"); };

    return (
        <div className={styles.divlogin}>
        <div className={styles.container}>
            <div className={frameClass}>
                <div className={activeButton === "reg" ? styles["nav-up"] : styles["nav"]}>
                    <ul className={styles.links}> 
                        <li className={activeLink === "signin" ? styles["signin-active"] : styles["signin-inactive"]}> 
                            <a className={styles.btn} onClick={handleClickSignIn}>Sign in</a>
                        </li> 
                        <li className={activeLink === "signup" ? styles["signup-active"] : styles["signup-inactive"]}>
                            <a className={styles.btn} onClick={handleClickSignUp}>Sign up</a>
                        </li>
                    </ul>
                </div>
                <div> 
                    <form className={activeLink === "signin" ? styles["form-signin"] : styles["form-signin-left"]}  action="" method="post" name="form">
                        <label htmlFor="username">Username</label>
                        <input className={styles["form-styling"]}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder=""
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input className={styles["form-styling"]}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                            required
                        />
                        <div className={styles["captcha-container"]}>
                            <ReCAPTCHA
                                sitekey="6LduhHgqAAAAAG6SwTg1Beu_vrBcBnf1Opozllu8"
                                onChange={handleCaptchaChange}
                            />
                        </div>                        
                        <div className={activeButton === "log" ? styles["btn-animate-grow"] : styles["btn-animate"]}>
                            <a className={styles["btn-signin"]} onClick={handleLogin}>Sign in</a>
                        </div>
                    </form>
                
                    <form className={formSignUp} action="" method="post" name="form">
                        <label htmlFor="fullname">Username</label>
                        <input className={styles["form-styling"]}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder=""
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input className={styles["form-styling"]}  name="email" 
                            type="text"
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input className={styles["form-styling"]}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                            required
                        />
                        <div className={styles["captcha-container"]}>
                            <ReCAPTCHA
                                sitekey="6LduhHgqAAAAAG6SwTg1Beu_vrBcBnf1Opozllu8"
                                onChange={handleCaptchaChange}
                            />
                        </div> 
                        <div className={styles["btn-animate"]}>
                            <a className={styles["btn-signup"]} onClick={handleRegister}>Sign Up</a>
                        </div>
                       
                        
                        
                    </form>
                </div>
            
                <div className={activeButton === "log" ? styles["forgot-fade"] : (activeLink === "signin" ? styles["forgot"] : styles["forgot-left"])}>
                    <a href="#">Forgot your password?</a>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login;