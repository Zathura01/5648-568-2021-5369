import React, { useState, createContext, useContext } from "react";


const UserFormContext = createContext();

export const UserFormProvider = ({children}) =>{

    const [showForm, setShowForm] = useState({showLog:false, showReg:false, showEmail: false, showOTP: false, showEdit: false, show: false});


    return (
        <UserFormContext.Provider value={{ showForm, setShowForm}}>
            {children}
        </UserFormContext.Provider>
    )
}

export const useFormContext = ()=> useContext(UserFormContext);