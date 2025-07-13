import React from 'react'
import { useFormContext } from '../context/UserFormContext'
import InputHook from '../hooks/InputHook';
import { useAlertContext } from '../context/AlertContext';
import { useUserContext } from '../context/UserContext';
import './Styleuser.css'

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'

function Forgot() {
    const email = InputHook();
    const formCtnx = useFormContext();
    const emailAlert = useAlertContext();
    const userCtx = useUserContext();
    

    const handleSubmit = async(e) => {
        e.preventDefault();  
        const emailValue = email.value;
        if (!emailValue) {
            emailAlert.showAlert('Email is required', 'error');
            return;
        }
        const response = await fetch(`${apiUrl}/${process.env.REACT_APP_API_KEY}/user/forgot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailValue })
        });
        const result = await response.json();
        if (result.success) {
            emailAlert.showAlert('Email sent successfully', 'success');
            userCtx.setUser((prev)=>({...prev, email: emailValue })); 
            userCtx.setOtp(result.OTP); // Store OTP in context for verification
            formCtnx.setShowForm({ showLog: false, showReg: false, showEmail: false, showOTP: true, showEdit: false, show: true });
        } else {
            emailAlert.showAlert('Failed to send email: ' + result.message, 'error');
        }
    }
  
    return (
    <>
    <form className='usernameStyle' onSubmit={handleSubmit}>
        <input type='email' placeholder='Enter your email' {...email.bind} name='email' />
        <button type='submit'>Submit</button>
        <button type='button' onClick={() => formCtnx.setShowForm({ showLog: true, showReg: false, showEmail: false, showOTP: false, showEdit: false, show: false })}>Go Back</button>
        <p>If you have forgotten your username/password, please enter your email address. We will send you an email with an OTP.</p>
        <p>If you have any other issues, please contact support.</p>    
    </form>
    </>
  )
}

export default Forgot;