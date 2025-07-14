// TransactionList.js
import React, { useEffect, useState } from 'react'
import TransactionCard from './TransactionCard'
import './TransactionList.css'
import { useUserContext } from '../../../context/UserContext'
import { useTransactionContext } from '../../../context/TransactionContext'
import { useAlertContext } from '../../../context/AlertContext'





const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'


function TransactionList() {
    const [transactionCard, setTrasactionCard] = useState([])
    const userCtx = useUserContext()
    const { trans, setTrans } = useTransactionContext()
    const alert = useAlertContext()



    const runFetch = async () => {
        const res = await fetch(`${apiUrl}/${apiKey}/transaction/getAllTransactions/${userCtx.user.id}`)
        const jdata = await res.json()
        if (jdata) setTrasactionCard(jdata)
    }

    const handleDelete = async (id, type) => {
        const res = await fetch(`${apiUrl}/${apiKey}/transaction/deleteTransaction/${id}?type=${type}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            const resjson = await res.json()
            setTrasactionCard(prev => prev.filter(t => t._id !== id))
            alert.showAlert(resjson.msg,'primary')
            setTrans(trans + 1)
        }else{
            const data = await res.json();
            console.log('Status:', res.status, 'Response:', data);
        }
    }

        useEffect(() => {
      
    }, [])

    useEffect(() => {
        runFetch()
        console.log(transactionCard)
    }, [trans])

    return (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Transaction List</h3>
            {transactionCard.map((val, ind) => (
                <TransactionCard
                    key={ind}
                    data={val}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );

}

export default TransactionList
