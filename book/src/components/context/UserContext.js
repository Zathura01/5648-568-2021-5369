import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({id: null, name: '', email: '', token: '', otp: null});
  const [setting , setSetting] = useState(true);


  const login = (id, email, name, token) => {
    setUser({ id, email, name, token, otp: null });
  };

  const logout = () => {
    setUser({ id: null, email: '', name: '', otp: null });
  };

  const setOtp = (otp) =>{
    setUser((prevUser) => ({ ...prevUser, otp }));
  }

  return (
    <UserContext.Provider value={{ user, login, logout, setOtp, setUser, setting, setSetting }}>
      {children}
    </UserContext.Provider>
  );
}   

export const useUserContext = () => useContext(UserContext);