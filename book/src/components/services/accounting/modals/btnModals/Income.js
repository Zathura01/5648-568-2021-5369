import React from "react";
import InputHook from '../../../../hooks/InputHook'
import { useUserContext } from "../../../../context/UserContext";
import { useAlertContext } from "../../../../context/AlertContext";
import { useTransactionContext } from "../../../../context/TransactionContext";
import '../btnModals/css/Modal.css'
import TakeInput from "../../../../hooks/TakeEntry";



const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'

const creditToOptions = ['SBI', 'AXIS', 'IDBI', 'MISC'];
// INCOME userid transid source creditto amount date cmt 

const Income = () => {
  const trans = useTransactionContext();
  const userCtx = useUserContext();
  const alert = useAlertContext();


  const userId = userCtx.user.id;
  const source = TakeInput('');
  const amount = TakeInput( );
  const date = TakeInput(new Date().toISOString().substring(0, 16));
  const comment = TakeInput('');
  const creditTo = TakeInput('SBI');

  const handleEntry = async () => {

    const formBo = {
      userId,
      source: source.val,
      amount: parseFloat(amount.val),
      date: new Date(date.val),
      comment: comment.val,
      creditTo: creditTo.val,
    };

    console.log(formBo);

    try {
      const res = await fetch(`${apiUrl}/${apiKey}/entry/newincome/Income`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formBo),
      });

      if (res.ok) {
        const data = await res.json();
        alert.showAlert('Income Transaction Completed', 'success')
        console.log(data);
        trans.setTrans((prev) => prev + 1)
      } else {
        throw new Error("Failed to save income entry");
      }
    } catch (err) {
      console.error(err);
      alert.showAlert("Error while saving entry: " + err.message,'danger');
    }
  };

  return (

    <div className="expense-form">
      <input type="text" placeholder="Enter The Source" {...source.bind} />
      <input type="number" placeholder="Enter The Income Amount" {...amount.bind} />
      <input type="datetime-local" {...date.bind} />
      <input type="text" placeholder="Enter Comments" {...comment.bind} />
      <select {...creditTo.bind}>
        {creditToOptions.map((val, key) => (
          <option value={val} key={key}>{val}</option>
        ))}
      </select>
      <button onClick={handleEntry}>Enter</button>
    </div>
  );
};

export default Income;
