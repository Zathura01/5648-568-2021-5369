import React, { useState } from 'react'
import Login from '../user/Login'
import Register from '../user/Register'
import './Stylenavbar.css'
import { useFormContext } from '../context/UserFormContext'





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

            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">BOOK</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">HOME</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">ACCOUNTING</a>
                            </li>
                             <li class="nav-item">
                                <a class="nav-link" href="#">SCHEDULER</a>
                            </li>
                             <li class="nav-item">
                                <a class="nav-link" href="#">LOGGER</a>
                            </li>
                             <li class="nav-item">
                                <a class="nav-link" href="#">DOODLER</a>
                            </li>
                        </ul>
                        <ul className='navbar-nav mb-2 mb-lg-0'>
                             <li class="nav-item">
                                <a class="nav-link" onClick={handleShowLogin}>LOGIN</a>
                            </li>
                             <li class="nav-item">
                                <a class="nav-link" onClick={handleShowRegister}>REGISTER</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        <div className='container-form'>
               { useFormCtx.showForm.showLog && <Login /> }
               { useFormCtx.showForm.showReg && <Register /> }
        </div>

        </>
    )
}

export default Navbarcomponent;