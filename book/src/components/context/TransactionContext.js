import { createContext, useContext, useState } from "react";


const TransactionContext = createContext();

export const TransactionProvider =({children})=>{

    const [trans, setTrans] = useState(0)

    return(
     <TransactionContext.Provider value={{ trans, setTrans}}>
        {children}
     </TransactionContext.Provider>
    )

}

export const useTransactionContext =()=> useContext(TransactionContext)