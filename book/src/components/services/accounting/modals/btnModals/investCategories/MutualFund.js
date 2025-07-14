import React from 'react'
import DebitFrom from './DebitFrom'
import TakeInput from '../../../../../hooks/TakeEntry';
import '../css/MutualFund.css'
import { useTransactionContext } from '../../../../../context/TransactionContext';
import { useUserContext } from '../../../../../context/UserContext';
import { useAlertContext } from '../../../../../context/AlertContext';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'

function MutualFund() {
    const { trans, setTrans } = useTransactionContext();
    const UserCtx = useUserContext();
    const alert = useAlertContext();


    const planType = TakeInput('LUMPSUM')
    const purchaseAmount = TakeInput( )
    const unitsBought = TakeInput( )
    const unitCost = TakeInput( )
    const date = TakeInput(new Date().toISOString().substring(0, 16))
    const comment = TakeInput('')
    const debit = TakeInput('')

    const handleEntry = async () => {

        const data = {
            userId: UserCtx.user.id,
            planType: planType.val,
            purchaseAmount: parseFloat(purchaseAmount.val),
            unitsBought: parseFloat(unitsBought.val),
            unitCost: parseFloat(unitCost.val),
            date: new Date(),
            comment: comment.val,
            debitFrom: debit.val
        }

        console.log(data)

        try {
            const res = await fetch(`${apiUrl}/${apiKey}/entry/newinvest/MutualFund`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const datajson = await res.json();
            if (res.ok) {
                alert.showAlert(datajson.message, 'success')
                setTrans(trans + 1);
            } else {
                alert.showAlert(datajson.message, 'danger');
            }
        } catch (err) {
            console.error(err)
            alert.showAlert('Error: ' + err.message, 'danger')
        }
    }

    return (
        <>
        <div className="gold-form"  >
            <label>Plan Type</label>
            <select {...planType.bind}>
                <option value="LUMPSUM">Lumpsum</option>
                <option value="SIP">SIP</option>
            </select>

            <input
                type="number"
                placeholder="Purchase Amount"
                {...purchaseAmount.bind}
            />

            <input
                type="number"
                placeholder="Units Bought"
                {...unitsBought.bind}
            />

            <input
                type="number"
                placeholder="Unit Cost"
                {...unitCost.bind}
            />


            <input
                type="text"
                placeholder="Comments (optional)"
                {...comment.bind}
            />

            <select {...debit.bind}>
                <option value="">-- Select Debit From --</option>
                {DebitFrom.map((val, key) => (
                    <option key={key} value={val}>{val}</option>
                ))}
            </select>
           </div>
           <div className="gold-form-actions">
            <button onClick={handleEntry}>Enter</button>
            </div>
        </>
    )
}

export default MutualFund
