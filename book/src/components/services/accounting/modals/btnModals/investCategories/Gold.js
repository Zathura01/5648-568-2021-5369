import React from 'react';
import DebitFrom from './DebitFrom';  // array like ['SBI', 'AXIS', ...]
import TakeInput from '../../../../../hooks/TakeEntry';
import '../css/Gold.css'
import { useTransactionContext } from '../../../../../context/TransactionContext';
import { useUserContext } from '../../../../../context/UserContext';
import { useAlertContext } from '../../../../../context/AlertContext';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'

function Gold() {
    const { trans, setTrans } = useTransactionContext();
    const UserCtx = useUserContext();
    const alert = useAlertContext();

    const purchaseAmount = TakeInput();
    const marketSellAmount = TakeInput();
    const qtyPurchased = TakeInput();
    const comment = TakeInput('');
    const debit = TakeInput('');

    const handleEntry = async () => {
        const data = {
            userId: UserCtx.user.id,
            purchaseAmount: parseFloat(purchaseAmount.val),
            marketSellAmount: parseFloat(marketSellAmount.val),
            qtyPurchased: parseFloat(qtyPurchased.val),
            date: new Date(),
            comment: comment.val,
            debitFrom: debit.val,
        };

        try {
            const res = await fetch(`${apiUrl}/${apiKey}/entry/newinvest/Gold`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const datajson = await res.json();
            if (res.ok) {
                alert.showAlert(datajson.message, 'success')
                setTrans(trans + 1);
            } else {
                alert.showAlert(datajson.message, 'danger');
            }
        } catch (err) {
            alert.showAlert('Failed to save: ' + err.message, 'danger');
            console.error(err);
        }
    };

    return (
        <form className="gold-form" onSubmit={e => { e.preventDefault(); handleEntry(); }}>
            <label htmlFor="purchaseAmount">Purchased Amount</label>
            <input id="purchaseAmount" type="number" {...purchaseAmount.bind} min="0" step="any" />

            <label htmlFor="marketSellAmount">Market Sell Amount</label>
            <input id="marketSellAmount" type="number" {...marketSellAmount.bind} min="0" step="any" />

            <label htmlFor="qtyPurchased">Quantity Purchased</label>
            <input id="qtyPurchased" type="number" {...qtyPurchased.bind} min="0" step="any" />

            <label htmlFor="comment">Comments</label>
            <input id="comment" type="text" {...comment.bind} />

            <label htmlFor="debitFrom">Debit From</label>
            <select id="debitFrom" {...debit.bind} >
                <option value="">-- Select Debit From --</option>
                {DebitFrom.map((val, key) => (
                    <option key={key} value={val}>{val}</option>
                ))}
            </select>

            <div className="gold-form-actions">
                <button type="submit">Enter</button>
            </div>
        </form>
    );
}

export default Gold;
