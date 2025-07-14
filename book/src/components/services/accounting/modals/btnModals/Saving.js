import React from 'react';
import { useTransactionContext } from '../../../../context/TransactionContext';
import { useUserContext } from '../../../../context/UserContext';
import { useAlertContext } from '../../../../context/AlertContext';
import '../btnModals/css/Save.css'
import TakeInput from '../../../../hooks/TakeEntry';


const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'
const catSave = ['SBI', 'AXIS', 'IDBI'];

function Saving() {
  const { trans, setTrans } = useTransactionContext();
  const userCtx = useUserContext()
  const alert = useAlertContext()

  const category = TakeInput('SBI');
  const amount = TakeInput();
  const comment = TakeInput('');

  const handleEntry = async () => {
    if (!userCtx.user?.id || !userCtx.user?.token) {
      alert.showAlert("You're not logged in.", 'danger');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/${apiKey}/entry/newsaving/Saving`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userCtx.user.id,
          category: category.val,
          amount: parseFloat(amount.val),
          date: new Date(),
          comment: comment.val,
        }),
      });

      const data = await res.json();
      console.log("Status:", res.status, "Response:", data);

      if (!res.ok) throw new Error(data.message || 'Unknown error');

      alert.showAlert('Saving Transaction Completed', 'info');
      setTrans(trans + 1);
    } catch (err) {
      console.error('Save error:', err);
      alert.showAlert(err.message || 'Something went wrong', 'danger');
    }

  };

  return (
    <div className="entry-form">
      <select {...category.bind}>
        {catSave.map((val, ind) => (
          <option value={val} key={ind}>{val}</option>
        ))}
      </select>

      <input type="number" {...amount.bind} placeholder="Amount" />

      <input type="text" {...comment.bind} placeholder="Comment" />

      <button onClick={handleEntry}>Save</button>
    </div>
  );
}

export default Saving
