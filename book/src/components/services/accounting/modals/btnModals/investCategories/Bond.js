import React from 'react';
import DebitFrom from './DebitFrom';

import TakeInput from '../../../../../hooks/TakeEntry';
import '../css/Bond.css'
import { useTransactionContext } from '../../../../../context/TransactionContext';
import { useUserContext } from '../../../../../context/UserContext';
import { useAlertContext } from '../../../../../context/AlertContext';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'

function Bond() {
  const { trans, setTrans } = useTransactionContext();
  const UserCtx = useUserContext();
  const alert = useAlertContext();

  const period = TakeInput(0);
  const amount = TakeInput(0);
  const interestAtStart = TakeInput(0);
  const comment = TakeInput('');
  const debit = TakeInput('');

  const handleEntry = async () => {
    if (!debit.val) {
      alert("Please select a debit account.");
      return;
    }

    const body = {
      userId: UserCtx.user.id,
      period: parseFloat(period.val),
      amount: parseFloat(amount.val),
      interestAtStart: parseFloat(interestAtStart.val),
      date: new Date(),
      comment: comment.val,
      debit: debit.val,
    };

    try {
      const res = await fetch(
        `${apiUrl}/${apiKey}/entry/newinvest/Bond`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const datajson = await res.json();
      if (res.ok) {
        alert.showAlert(datajson.message, 'success')
        setTrans(trans + 1);
      } else {
        alert.showAlert(datajson.message,'danger');
      }
    } catch (err) {
      console.error('Error saving entry:', err);
      alert.showAlert('Error saving entry:','danger');
    }
  };

  return (
    <form
      className="fib-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleEntry();
      }}
    >
      <div className="fib-row">
        <label htmlFor="period">Bond Period (years)</label>
        <input
          id="period"
          type="number"
          min="0"
          {...period.bind}
          required
          className="fib-input"
          placeholder="Enter bond period"
        />
      </div>

      <div className="fib-row">
        <label htmlFor="deposit">Deposit Amount</label>
        <input
          id="amount"
          type="number"
          min="0"
          {...amount.bind}
          required
          className="fib-input"
          placeholder="Enter deposit amount"
        />
      </div>

      <div className="fib-row">
        <label htmlFor="interestAtStart">Initial Interest Rate (%)</label>
        <input
          id="interestAtStart"
          type="number"
          min="0"
          step="0.01"
          {...interestAtStart.bind}
          required
          className="fib-input"
          placeholder="Enter initial interest rate"
        />
      </div>


      <div className="fib-row">
        <label htmlFor="comment">Comment</label>
        <input
          id="comment"
          type="text"
          {...comment.bind}
          className="fib-input"
          placeholder="Optional"
        />
      </div>

      <div className="fib-row">
        <label htmlFor="debit">Debit From</label>
        <select
          id="debit"
          {...debit.bind}
          required
          className="fib-select"
        >
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

      <div className="fib-row fib-actions">
        <button type="submit" className="fib-button">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Bond;
