import React from 'react'
import './Styleuser.css'
import InputHook from '../hooks/InputHook'
import { useFormContext } from '../context/UserFormContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useAlertContext } from '../context/AlertContext';
import { useUserContext } from '../context/UserContext';
const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'




function Login() {
    const nav = useNavigate();
    const userName = InputHook('');
    const password = InputHook('');
    const useFormCtx = useFormContext();
    const alertLogin = useAlertContext()
    const userCtx = useUserContext();

    const runSubmit = async (e) => {
        e.preventDefault();
        const passwordValue = password.value;
        const valid = /[A-Z]/.test(passwordValue) && // at least one uppercase
            /[0-9]/.test(passwordValue) && // at least one number
            /[^A-Za-z0-9]/.test(passwordValue); // at least one special char

        if (!valid) {
            alertLogin.showAlert(
                'Password must contain at least one uppercase letter, one number, and one special character.',
                'error'
            );
            return;
        }


        let dataTosend = {
            userName: userName.value,
            password: password.value
        }
        const data = await fetch(`${apiUrl}/${apiKey}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataTosend)
        });
        const result = await data.json();
        if (result.success) {
            alertLogin.showAlert('Login successful', 'success');
            userCtx.setUser({
                userName: result.userName,
                userId: result.userId,
                token: result.token,
                email: result.email,
                otp: null
            });
            nav('/home');
            useFormCtx.setShowForm({ showLog: false, showReg: false, showEmail: false, showOTP: false, showEdit: false, show: false });
        } else {
            alertLogin.showAlert('Login failed: '+ result.message, 'error');
        }

    }

    const runRegister = () => {
        useFormCtx.setShowForm({ showLog: false, showReg: true, show: true });
    }

    const runForgot = () => {
        useFormCtx.setShowForm({ showLog: false, showReg: false, showEmail: true, showOTP: false, showEdit: false, show: true });
    }


    return (
        <>
            <form className='loginStyle' onSubmit={runSubmit}>
                <FontAwesomeIcon className="closeBtn" icon={faCircleXmark} onClick={() => useFormCtx.setShowForm({ showLog: false, showReg: false, show: false })} />
                <label>Username</label>
                <input type="text" placeholder="Username" {...userName.bind} />
                <label>Password</label>
                <input type="password" placeholder="Password" {...password.bind} />
                <button type="submit">Login</button>
                <button type="button" onClick={runForgot}>Forgot Username/ Password</button>
                <button type="button" onClick={runRegister}>Go to Registeration</button>
            </form>
        </>
    )
}

export default Login