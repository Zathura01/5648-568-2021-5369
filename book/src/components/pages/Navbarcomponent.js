import React, { useState } from 'react'
import Login from '../user/Login'
import Register from '../user/Register'
import './Stylenavbar.css'
import { useFormContext } from '../context/UserFormContext'
import icon from '../../../src/ICON.png'
import Edituser from '../user/Edituser'
import Forgot from '../user/Forgot'
import Otp from '../user/Otp'



function Navbarcomponent() {

   const useFormCtx = useFormContext();

    const handleShowLogin = () => {
           useFormCtx.setShowForm({showLog:true, showReg:false, show:true});
    }

    const handleShowRegister = () => {
 useFormCtx.setShowForm({showLog:false, showReg:true, show:true});
    }



    return (
        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className='brand'>
                    <img src={icon} />
                    <a className="navbar-brand" href="#">BOOK</a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">ACCOUNTING</a>
                            </li>
                             <li className="nav-item">
                                <a className="nav-link" href="#">SCHEDULER</a>
                            </li>
                             <li className="nav-item">
                                <a className="nav-link" href="#">LOGGER</a>
                            </li>
                             <li className="nav-item">
                                <a className="nav-link" href="#">DOODLER</a>
                            </li>
                        </ul>
                        <ul className='navbar-nav mb-2 mb-lg-0'>
                             <li className="nav-item">
                                <a className="nav-link" onClick={handleShowLogin}>LOGIN</a>
                            </li>
                             <li className="nav-item">
                                <a className="nav-link" onClick={handleShowRegister}>REGISTER</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        <div className='container-form'>
               { useFormCtx.showForm.showLog && <Login /> }
               { useFormCtx.showForm.showReg && <Register /> }
                { useFormCtx.showForm.showEmail && <Forgot /> }
                 { useFormCtx.showForm.showOTP && <Otp /> }
                  { useFormCtx.showForm.showEdit && <Edituser /> }
        </div>

        </>
    )
}

export default Navbarcomponent;