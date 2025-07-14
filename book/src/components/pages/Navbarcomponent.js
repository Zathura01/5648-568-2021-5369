import React, { useEffect, useState } from 'react'
import Login from '../user/Login'
import Register from '../user/Register'
import './Stylenavbar.css'
import { useFormContext } from '../context/UserFormContext'
import icon from '../../../src/ICON.png'
import Edituser from '../user/Edituser'
import Forgot from '../user/Forgot'
import Otp from '../user/Otp'
import { useUserContext } from '../context/UserContext'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Navbarcomponent() {

    const useFormCtx = useFormContext();
    const userCtx = useUserContext();
    const nav = useNavigate();



    const handleShowLogin = () => {
        useFormCtx.setShowForm({ showLog: true, showReg: false, show: true });
    }

    const handleShowRegister = () => {
        useFormCtx.setShowForm({ showLog: false, showReg: true, show: true });
    }

    const handleLogout = () => {
        userCtx.setUser({ id: null, name: '', token: '', email: '', otp: '' });
        nav('/');
    }

    const handleShowSettings = () => {
        if (userCtx.setting) {
            userCtx.setSetting(false)
        } else {
            userCtx.setSetting(true)
        }
        console.log('Settings toggled:', userCtx.setting);
    }

    useEffect(() => {
        console.log('fired')
    }, [userCtx.setting, userCtx.user])



    return (
        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: `${userCtx.setting} ? 'white':'black'`, color: `${userCtx.setting} ? 'black':'white'` }}>
                <div className="container-fluid">
                    <div className='brand'>
                        <img src={icon} />
                        <Link className="nav-link" to="/home">HOME</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">USER</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/accounting">ACCOUNTING</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/scheduler">SCHEDULER</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logger">LOGGER</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/doodler">DOODLER</Link>
                            </li>
                        </ul>

                        <ul className='navbar-nav mb-2 mb-lg-0'>

                            {userCtx.user && userCtx.user.token ?
                                (<>

                                
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>LOGOUT</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={handleShowSettings} style={{ cursor: 'pointer' }}>
                                            <FontAwesomeIcon icon={faLightbulb} />
                                            &nbsp; {userCtx.setting ? 'DARK MODE' : 'LIGHT MODE'}
                                        </a>
                                    </li>
                                </>) : (<>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={handleShowLogin} style={{ cursor: 'pointer' }}>LOGIN</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={handleShowRegister} style={{ cursor: 'pointer' }}>REGISTER</a>
                                    </li>
                                </>)
                            }

                        </ul>
                    </div>
                </div>
            </nav>

            <div className='container-form'>
                {useFormCtx.showForm.showLog && <Login />}
                {useFormCtx.showForm.showReg && <Register />}
                {useFormCtx.showForm.showEmail && <Forgot />}
                {useFormCtx.showForm.showOTP && <Otp />}
                {useFormCtx.showForm.showEdit && <Edituser />}
            </div>

        </>
    )
}

export default Navbarcomponent;