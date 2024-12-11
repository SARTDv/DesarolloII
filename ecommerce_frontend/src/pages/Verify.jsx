import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = ({ match }) => {
    const { uidb64, token } = match.params;

    useEffect(() => {
        const Verify = async () => {
            try {
                // Realizamos la solicitud para activar la cuenta
                await axios.get(`http://localhost:8000/api/accounts/activate/${uidb64}/${token}`);
                toast.success('Account activated successfully!', { autoClose: true });
            } catch (error) {
                toast.error('Invalid activation link!', { autoClose: true });
            }
        };

        // Llamamos a la función de activación cuando el componente se monta
        Verify();
    }, [uidb64, token]); // Dependencias para asegurar que se ejecute al cambiar los parámetros

    return <div>Activating your account...</div>;
};

export default Verify;
