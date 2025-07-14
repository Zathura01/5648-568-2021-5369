import React, { useEffect } from 'react'
import { useUserContext } from '../../context/UserContext'
import '../userspecific/Stylespecific.css'
import LoggerScreen from '../../services/logger/screen/LoggerScreen';
import LoggerList from '../../services/logger/list/LoggerList';



function Logger() {
    const userCtx = useUserContext();

    useEffect(() => {
        console.log('Home component mounted or userCtx changed');
    }, [userCtx.setting]);




    return (
        <>
            <div className={`containerLogger ${userCtx.setting?'lightTheme':'darkTheme'} `}>
                <div className='Logger'>
                    <div className='screen'>
                        <LoggerScreen />
                    </div>
                    <div className='list'>
                        <LoggerList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Logger