import React from 'react';
 import { useTransactionContext } from '../../../../context/TransactionContext';
import { useUserContext } from '../../../../context/UserContext';
import { useAlertContext } from '../../../../context/AlertContext';
import '../btnModals/css/Save.css'
import TakeInput from '../../../../hooks/TakeEntry';


const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'
const creditTo = ['SBI', 'AXIS', 'IDBI', 'MISC', 'PHYSICAL'];

const debitFrom = {
  SAVE: ['SBI', 'AXIS', 'IDBI', 'MISC'],
  INVEST: ['FIXEDDEPOSIT', 'BOND', 'GOLD', 'MUTUALFUND'],
  MISC: ['CASH', 'GIFT', 'OTHER']
};

function Withdrawal () {
  const { trans, setTrans } = useTransactionContext();
  const userCtx = useUserContext()
    const alert = useAlertContext()

  const amount = TakeInput( );
  const date = TakeInput(new Date().toISOString().substring(0, 16));
  const comment = TakeInput('');
  const credit = TakeInput('');
  const debit = TakeInput('');

  const handleEntry = async () => {
    const data = {
      userId: userCtx.user.id,
      amount: parseFloat(amount.val),
      date: new Date(date.val),
      comment: comment.val,
      creditTo: credit.val,
      debitFrom: debit.val
    };

    try {
      const res = await fetch(`${apiUrl}/${apiKey}/entry/newwithdrawal/Withdrawal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        const json = await res.json();
        alert.showAlert("Withdrawal Transaction Completed",'success');
        console.log(json);
        setTrans(trans + 1);
      } else {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong.");
      }
    } catch (err) {
      alert.showAlert("Error saving withdrawal: " + err.message,'danger');
      console.error(err);
    }
  };

  return (
    <div className="expense-form">
      <input type="number" placeholder="Enter Amount To Be Withdrawed" {...amount.bind} />
      <input type="datetime-local" placeholder="Select Date" {...date.bind} />
      <input type="text" placeholder="Enter Comments" {...comment.bind} />

      <select {...credit.bind}>
        <option value="">-- Select Credit To --</option>
        {creditTo.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>

      <select {...debit.bind}>
        <option value="">-- Select Debit From --</option>
        {Object.entries(debitFrom).map(([group, options]) => (
          <optgroup label={group} key={group}>
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </optgroup>
        ))}
      </select>

      <button onClick={handleEntry}>Enter</button>
    </div>
  );
}

export default Withdrawal ;
