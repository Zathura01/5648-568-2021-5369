import React from 'react'
import './Styleuser.css'
import InputHook from '../hooks/InputHook'
import { useFormContext } from '../context/UserFormContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
const apiKey = process.env.REACT_APP_API_KEY;



function Register() {

    const userName = InputHook('');
    const password = InputHook('');
    const email = InputHook('');
    const useFormCtx = useFormContext();

    const runSubmit = async(e) => {
         e.preventDefault();
        let dataTosend = {
            userName: userName.value,
            password: password.value,
            email: email.value
        }

        const data = await fetch(`http://localhost:4500/${apiKey}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },  
            body: JSON.stringify(dataTosend)
        });
        const result = await data.json();
        if (result.success) {   
            alert('Registration successful');
            useFormCtx.setShowForm({ showLog: false, showReg: false, show: false });
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
                <input type="text" placeholder="Username" { ...userName.bind} />
                <input type="password" placeholder="Password"{ ...password.bind} />
                <input type="email" placeholder="Email" { ...email.bind}/>
                <button type="submit">Register</button>
                <button type="button" onClick={runLogin}>Go to Login</button>
            </form>
           
        </>
    )
}

export default Register