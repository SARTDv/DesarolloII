import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import styles from '../css/strideLogin.module.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

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
            alert("Registro exitoso");
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
            
                    <div  className={activeButton === "reg" ? styles["success-left"] : styles["success"]}>
                        <svg width="270" height="270" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 60 60"/>
                        <path fill="#ffffff" d="M40.61,23.03L26.67,36.97L13.495,23.788c-1.146-1.147-1.359-2.936-0.504-4.314
                            c3.894-6.28,11.169-10.243,19.283-9.348c9.258,1.021,16.694,8.542,17.622,17.81c1.232,12.295-8.683,22.607-20.849,22.042
                            c-9.9-0.46-18.128-8.344-18.972-18.218c-0.292-3.416,0.276-6.673,1.51-9.578" />
                        <div className={styles["successtext"]}>
                            <p> Thanks for signing up! Check your email for confirmation.</p>
                        </div>
                    </div>
                </div>
            
                <div className={activeButton === "log" ? styles["forgot-fade"] : (activeLink === "signin" ? styles["forgot"] : styles["forgot-left"])}>
                    <a href="#">Forgot your password?</a>
                </div>
            
                <div>
                    <div className={activeButton === "log" ? styles["cover-photo-down"] : styles["cover-photo"]}></div>
                    <div className={activeButton === "log" ? styles["profile-photo-down"] : styles["profile-photo"]}></div>
                    <h1 className={activeButton === "log" ? styles["welcome-left"] : styles["welcome"]}>Welcome, CDOBLETA</h1>
                    <a className={activeButton === "log" ? styles["btn-goback-up"] : styles["btn-goback"]} value="Refresh">Go back</a>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login;