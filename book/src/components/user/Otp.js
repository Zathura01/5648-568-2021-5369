import React, { useRef, useState } from 'react';
import { useFormContext } from '../context/UserFormContext'
import { useUserContext } from '../context/UserContext';
import { useAlertContext } from '../context/AlertContext';




function Otp() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const formCtnx = useFormContext();
    const userCtx = useUserContext();
    const alert = useAlertContext();
    

    const handleChange = (e, idx) => {
        const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
        const newOtp = [...otp];
        newOtp[idx] = val;
        setOtp(newOtp);

        // Move to next input if value entered
        if (val && idx < 3) {
            inputsRef[idx + 1].current.focus();
        }
    };

    const runSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length < 4) {
            alert.showAlert('Please enter a valid 4-digit OTP', 'error');
            return; 
           
        }
        console.log('Entered OTP:', otpValue);
        console.log('Expected OTP:', userCtx.user.otp);
        if (otpValue !== String(userCtx.user.otp)) {
            alert.showAlert('Invalid OTP', 'error');
            return;
        }
        alert.showAlert('OTP verified successfully', 'success');
        formCtnx.setShowForm({ showLog: false, showReg: false, showEmail: false, showOTP: false, showEdit: true, show: false });
        userCtx.setOtp(''); // Clear OTP from context after successful verification

    };

    return (
        <>
            <form className='OTPStyle' onSubmit={runSubmit}>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={inputsRef[idx]}
                            type='text'
                            inputMode='numeric'
                            maxLength={1}
                            value={digit}
                            onChange={e => handleChange(e, idx)}
                            style={{
                                width: '48px',
                                height: '48px',
                                fontSize: '2rem',
                                textAlign: 'center',
                                borderRadius: '8px',
                                border: '1px solid #ccc'
                            }}
                        />
                    ))}
                </div>
                <button type='submit' style={{ marginTop: '24px' }}>Submit</button>
                <button type='button' onClick={() => formCtnx.setShowForm({ showLog: true, showReg: false, showEmail: false, showOTP: false, showEdit: false, show: false })}>Go Back</button>

            </form>
        </>
    );
}

export default Otp;