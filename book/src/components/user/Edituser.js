import React from 'react'
import InputHook from '../hooks/InputHook'
import { useFormContext } from '../context/UserFormContext';
import { useAlertContext } from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import './Styleuser.css'
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'




function Edituser() {
    const username = InputHook('');
    const password = InputHook('');
    const formCtx = useFormContext();
    const alert = useAlertContext();
    const nav = useNavigate();
    const userCtx = useUserContext();



    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordValue = password.value;
        const valid = /[A-Z]/.test(passwordValue) && // at least one uppercase
            /[0-9]/.test(passwordValue) && // at least one number
            /[^A-Za-z0-9]/.test(passwordValue); // at least one special char

        if (!valid) {
            alert.showAlert(
                'Password must contain at least one uppercase letter, one number, and one special character.',
                'error'
            );
            return;
        }

        let dataTosend = {
            userName: username.value,
            password: password.value,
            email: userCtx.user.email
            }
        const response = await fetch(`${apiUrl}/${process.env.REACT_APP_API_KEY}/user/edit`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataTosend)
        });
        const result = await response.json();
        if (result.success) {
            alert.showAlert('User details updated successfully', 'success');
            formCtx.setShowForm({ showLog: true, showReg: false, showEmail: false, showOTP: false, showEdit: false, show: false });
        } else {
            alert.showAlert('Failed to update user details: ' + result.message, 'error');
        }

    }


    return (
        <>
            <form className='loginStyle' onSubmit={handleSubmit}>
                <label>Enter New Username</label>
                <input type='text' placeholder='Enter new username' {...username.bind} name='username' />
                <label>Enter New Password</label>
                <input type='password' placeholder='Enter new password' {...password.bind} name='password' />
                <button type='submit'>Update</button>
                <button type='button' onClick={() => formCtx.setShowForm({ showLog: true, showReg: false, showEmail: false, showOTP: false, showEdit: false, show: false })}>Go Back</button>
                <p>If you want to change your username or password, please enter the new details above.</p>
                <p>If you have any issues, please contact support.</p>
                <p>Note: Make sure your new password meets the security requirements.</p>
                <p>Username and password changes will be reflected in your account immediately.</p>

            </form>
        </>
    )
}

export default Edituser