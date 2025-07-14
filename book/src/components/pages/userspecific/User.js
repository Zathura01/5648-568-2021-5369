import React, { useEffect } from 'react'
import { useUserContext } from '../../context/UserContext'



function User() {

    const userCtx = useUserContext();

    useEffect(() => {
        console.log('Home component mounted or userCtx changed');
    }, [userCtx.setting]);



    return (
        <>
            <div className='container' style={{ padding: '20px', backgroundColor: userCtx.setting ? 'white' : 'black', color: userCtx.setting ? 'black' : 'white' }}>

            </div>
        </>
    )
}

export default User