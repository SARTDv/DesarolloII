import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            setErrorMessage('Por favor, complete el CAPTCHA');
            return;
          }
          const data = {
            username,
            password,
            'g-recaptcha-response': captchaValue,
          };
        try {
            const response = await axios.post('http://localhost:8000/api/accounts/register/', data);
            setSuccess(true);
            console.log("Usuario registrado:", response.data);
        } catch (error) {
            setError("Hubo un error al registrar el usuario");
            console.error("Error en el registro:", error);
        }
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nombre de usuario"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                 <ReCAPTCHA
                    sitekey="6LduhHgqAAAAAG6SwTg1Beu_vrBcBnf1Opozllu8"
                    onChange={handleCaptchaChange}
                />
                <button type="submit">Registrar</button>
            </form>
            {success && <p>Registro exitoso</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Register;
