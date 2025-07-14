import React, { createContext, useContext } from "react";
import TakeInput from "../hooks/TakeEntry";
import "../context/Cntx.css";
import { useUserContext } from "./UserContext";

const modalCntx = createContext();

export const ModalProvider = ({ children }) => {
  const modalcontent = TakeInput(null);
  const isVisible = TakeInput(false);
  const userCtx = useUserContext();

  const showModal = (content) => {
    modalcontent.setVal(content);
    isVisible.setVal(true);
  };

  const hideModal = () => {
    modalcontent.setVal(null);
    isVisible.setVal(false);
  };

  return (
    <modalCntx.Provider value={{ showModal, hideModal }}>
      {children}
      {isVisible.val && (
        <div className={`modal-overlay ${userCtx.setting ? 'light-theme' : 'dark-theme'}`}>
          <div className="modal-content">
            {modalcontent.val}
            <button className="modal-close-btn" onClick={hideModal}>Close</button>
          </div>
        </div>
      )}
    </modalCntx.Provider>
  );
};

export const useModal = () => useContext(modalCntx);
