import React from 'react'
import './Styleuser.css'
import InputHook from '../hooks/InputHook'
import { useFormContext } from '../context/UserFormContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
const apiKey = process.env.REACT_APP_API_KEY;

function Login() {

    const userName = InputHook('');
    const password = InputHook('');
    const useFormCtx = useFormContext();

    const runSubmit = async(e) => {
        e.preventDefault();
        let dataTosend = {
            userName: userName.value,
            password: password.value
        }
        const data = await fetch(`http://localhost:4500/${apiKey}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },  
            body: JSON.stringify(dataTosend)
        });
        const result = await data.json();
        if (result.success) {
            alert('Login successful');
            useFormCtx.setShowForm({ showLog: false, showReg: false, show: false });
        } else {
            alert('Login failed: ' + result.message);
        }   

    }

    const runRegister = () => {
        useFormCtx.setShowForm({ showLog: false, showReg: true, show: true });
    }


    return (
        <>
            <form className='loginStyle' onSubmit={runSubmit}>
               <FontAwesomeIcon className="closeBtn" icon={faCircleXmark} onClick={() => useFormCtx.setShowForm({ showLog: false, showReg: false, show: false })} />
                <input type="text" placeholder="Username" {...userName.bind} />
                <input type="password" placeholder="Password" {...password.bind} />
                <button type="submit">Login</button>
                <button type="button" onClick={runRegister}>Go to Registeration</button>
            </form>
        </>
    )
}

export default Login