import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Styleuser.css'
import InputHook from '../hooks/InputHook'
import { useFormContext } from '../context/UserFormContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useAlertContext } from '../context/AlertContext';
import { useUserContext } from '../context/UserContext';
const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'


function Register() {
    const navigate = useNavigate();
    const userName = InputHook('');
    const password = InputHook('');
    const email = InputHook('');
    const useFormCtx = useFormContext();
    const alertRegister = useAlertContext();
    const userCtx = useUserContext();

    const runSubmit = async (e) => {
        e.preventDefault();

        const passwordValue = password.value;
        const valid = /[A-Z]/.test(passwordValue) && // at least one uppercase
            /[0-9]/.test(passwordValue) && // at least one number
            /[^A-Za-z0-9]/.test(passwordValue); // at least one special char

        if (!valid) {
            alertRegister.showAlert(
                'Password must contain at least one uppercase letter, one number, and one special character.',
                'error'
            );
            return;
        }
        let dataTosend = {
            userName: userName.value,
            password: password.value,
            email: email.value
        }

        const data = await fetch(`${apiUrl}/${apiKey}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataTosend)
        });
        const result = await data.json();
        if (result.success) {
            alertRegister.showAlert('Registration successful', 'success');
            userCtx.setUser({
                userName: result.userName,
                userId: result.userId,
                token: result.token,
                email: result.email,
                otp: null
            });
            navigate('/home');
            useFormCtx.setShowForm({ showLog: false, showReg: false, showEmail: false, showOTP: false, showEdit: false, show: false });
        } else {
            alert('Registration failed: ' + result.message);
        }



    }
    const runLogin = () => {
        useFormCtx.setShowForm({ showLog: true, showReg: false, show: true });
    }



    return (
        <>
            <form className='registerStyle' onSubmit={runSubmit}>
                <FontAwesomeIcon className="closeBtn" icon={faCircleXmark} onClick={() => useFormCtx.setShowForm({ showLog: false, showReg: false, show: false })} />
                <label>Username</label>
                <input type="text" placeholder="Username" {...userName.bind} />
                <label>Password</label>
                <input type="password" placeholder="Password"{...password.bind} />
                <label>Email</label> 
                <input type="email" placeholder="Email" {...email.bind} />
                <button type="submit">Register</button>
                <button type="button" onClick={runLogin}>Go to Login</button>
            </form>

        </>
    )
}

export default Register