import React, { useState } from 'react';
import axios from 'axios';
import '../css/strideLogin.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:8000/api/accounts/login/', { //Quiero cambiar esto
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token); // Guardar el token en el almacenamiento local
            alert("Inicio de sesión exitoso");
        } catch (error) {
            setError("Credenciales inválidas");
        }
    };

    return (
        <div class="container">
            <div class="frame">
                <div class="nav">
                    <ul class="links">
                        <li class="signin-active"><a class="btn">Sign in</a></li>
                        <li class="signup-inactive"><a class="btn">Sign up </a></li>
                    </ul>
                </div>
                <div ng-app ng-init="checked = false">
                    <form class="form-signin" action="" method="post" name="form">
                        <label for="username">Username</label>
                        <input class="form-styling" type="text" name="username" placeholder=""/>
                        <label for="password">Password</label>
                        <input class="form-styling" type="text" name="password" placeholder=""/>
                        <div class="btn-animate">
                            <a class="btn-signin">Sign in</a>
                        </div>
                    </form>
                
                    <form class="form-signup" action="" method="post" name="form">
                        <label for="fullname">Full name</label>
                        <input class="form-styling" type="text" name="fullname" placeholder=""/>
                        <label for="email">Email</label>
                        <input class="form-styling" type="text" name="email" placeholder=""/>
                        <label for="password">Password</label>
                        <input class="form-styling" type="text" name="password" placeholder=""/>
                        <label for="confirmpassword">Confirm password</label>
                        <input class="form-styling" type="text" name="confirmpassword" placeholder=""/>
                        <a ng-click="checked = !checked" class="btn-signup">Sign Up</a>
                    </form>
            
                    <div  class="success">
                    <svg width="270" height="270" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 60 60" id="check" ng-class="checked ? 'checked' : ''"/>
                        <path fill="#ffffff" d="M40.61,23.03L26.67,36.97L13.495,23.788c-1.146-1.147-1.359-2.936-0.504-4.314
                        c3.894-6.28,11.169-10.243,19.283-9.348c9.258,1.021,16.694,8.542,17.622,17.81c1.232,12.295-8.683,22.607-20.849,22.042
                        c-9.9-0.46-18.128-8.344-18.972-18.218c-0.292-3.416,0.276-6.673,1.51-9.578" />
                        <div class="successtext">
                        <p> Thanks for signing up! Check your email for confirmation.</p>
                        </div>
                    </div>
                </div>
            
                <div class="forgot">
                    <a href="#">Forgot your password?</a>
                </div>
            
                <div>
                    <div class="cover-photo"></div>
                    <div class="profile-photo"></div>
                    <h1 class="welcome">Welcome, CDOBLETA</h1>
                    <a class="btn-goback" value="Refresh" onClick="history.go()">Go back</a>
                </div>
            </div>
        </div>
    );
}

export default Login;