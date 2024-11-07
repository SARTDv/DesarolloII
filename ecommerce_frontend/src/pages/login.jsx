import React, { useState } from 'react';
import axios from 'axios';


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
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default Login;