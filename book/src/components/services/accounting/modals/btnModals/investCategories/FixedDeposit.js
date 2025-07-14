import React from 'react';
import DebitFrom from './DebitFrom';
import TakeInput from '../../../../../hooks/TakeEntry';
import '../css/Fixeddeposit.css'
import { useTransactionContext } from '../../../../../context/TransactionContext';
import { useUserContext } from '../../../../../context/UserContext';
import { useAlertContext } from '../../../../../context/AlertContext';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'

function FixedDeposit() {
  const { trans, setTrans } = useTransactionContext();
  const userCtx = useUserContext()
  const alert = useAlertContext()

// userid source amount date interest duration-year/month/days
  const amount = TakeInput( );
  const interestRate = TakeInput( );
  const date = TakeInput(new Date().toISOString().substring(0, 10));
  const comment = TakeInput('');
  const debit = TakeInput('');

  const handleEntry = async () => {
    if (!debit.val) {
      alert("Please select a debit account.");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/${apiKey}/entry/newinvest/FixedDeposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userCtx.user.id,
          amount: Number(amount.val),
          interestRate: Number(interestRate.val),
          date: new Date(date.val),
          comment: comment.val,
          debit: debit.val,
        }),
      });

      const datajson = await res.json();
      if (res.ok) {
          alert.showAlert(datajson.message, 'success')
        setTrans(trans + 1);
      } else {
        alert.showAlert(datajson.message,'danger');
      }
    } catch (error) {
      alert.showAlert("Something went wrong",'danger');
      console.error(error);
    }
  };

  return (
    <form className="fd-form" onSubmit={(e) => { e.preventDefault(); handleEntry(); }}>
      <div className="fd-row">
        <label htmlFor="deposit">Deposit Amount</label>
        <input
          id="amount"
          type="number"
          min="0"
          {...amount.bind}
          required
          className="fd-input"
          placeholder="Enter deposit amount"
        />
      </div>

      <div className="fd-row">
        <label htmlFor="interestRate">Interest Rate (%)</label>
        <input
          id="interestRate"
          type="number"
          min="0"
          step="0.01"
          {...interestRate.bind}
          required
          className="fd-input"
          placeholder="Enter interest rate"
        />
      </div>

      <div className="fd-row">
        <label htmlFor="date">Maturity Date</label>
        <input
          id="date"
          type="date"
          {...date.bind}
          required
          className="fd-input"
        />
      </div>

      <div className="fd-row">
        <label htmlFor="comment">Comment</label>
        <input
          id="comment"
          type="text"
          {...comment.bind}
          className="fd-input"
          placeholder="Optional"
        />
      </div>

      <div className="fd-row">
        <label htmlFor="debit">Debit From</label>
        <select id="debit" {...debit.bind} required className="fd-select">
          <option value="" disabled>
            -- Select Debit Account --
          </option>
          {DebitFrom.map((val, key) => (
            <option key={key} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <div className="fd-row fd-actions">
        <button type="submit" className="fd-button">Enter</button>
      </div>
    </form>
  );
}

export default FixedDeposit;
