import React, { createContext, useState, useContext } from 'react';
import '../context/Cntx.css'



const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ status: false, message: '', type: '' });

  const showAlert = (message, type) => {
    setAlert({ status: true, message, type });
    setTimeout(() => {
      setAlert({ status: false, message: '', type: '' });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      <>
        {alert.status && (
          <div className={`custom-alert custom-alert-${alert.type}`}>
            {alert.message}
          </div>
        )}
        {children}
      </>
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);