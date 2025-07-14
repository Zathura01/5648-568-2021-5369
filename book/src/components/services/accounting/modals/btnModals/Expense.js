import React from 'react'
import { useTransactionContext } from '../../../../context/TransactionContext';
import { useUserContext } from '../../../../context/UserContext';
import { useAlertContext } from '../../../../context/AlertContext';
import '../../modals/btnModals/css/Expense.css'
import TakeInput from '../../../../hooks/TakeEntry';


const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'
const expCat = {
  Food: [
    'Biscuit', 'Bread', 'Biryani', 'Buttermilk', 'Cake', 'Chips', 'Chocolate', 'Coffee',
    'Doughnut', 'Egg', 'Milk', 'Misc', 'Noodles', 'Paneer', 'Pickle', 'Pulses',
    'Rice', 'Soda', 'Souce', 'Spices', 'Sugar', 'Toast', 'Wheat'
  ],
  Shelter: [],
  Gas: [],
  Bike: [],
  Stationary: [],
  Smoke: [],
  Shopping: [],
  Washing: [],
  Wine: [],
  Medicine: [],
  Jio: ['Cell', 'Wifi'],
  Misc: [],
  Health: []
}

const deb = ['SBI', 'AXIS', 'IDBI', 'MISC']

function Expense () {
      const { trans, setTrans } = useTransactionContext()
      const userCtx = useUserContext()
      const alert = useAlertContext()
    
  const category = TakeInput('Food')
  const subcategory = TakeInput('Biscuit')
  const amount = TakeInput( )
  const date = TakeInput(new Date().toISOString().substring(0, 16))
  const comment = TakeInput('')
  const debit = TakeInput('SBI')

  const handleEntry = async () => {
    const entry = {
      userId: userCtx.user.id,
      category: category.val,
      subcategory: subcategory.val,
      amount: Number(amount.val),
      date: new Date(date.val),
      comment: comment.val,
      debitFrom: debit.val
    }

    try {

      const response = await fetch(`${apiUrl}/${apiKey}/entry/newexpense/Expense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to save')
      }
      console.log(result)
      alert.showAlert(result.message, 'success')
              setTrans(trans+1);

    } catch (error) {
      console.error('Error:', error)
      alert.showAlert('Failed to save expense')
    }
  }

  return (
  <div className="expense-form">
    <select {...category.bind}>
      {Object.keys(expCat).map((cat, ind) => (
        <option key={ind} value={cat}>{cat}</option>
      ))}
    </select>

    {expCat[category.val]?.length > 0 && (
      <select {...subcategory.bind}>
        {expCat[category.val].map((item, i) => (
          <option key={i} value={item}>{item}</option>
        ))}
      </select>
    )}

    <input type="number" {...amount.bind} placeholder="Enter Expense Amount" />
    <input type="datetime-local" {...date.bind} />
    <input type="text" {...comment.bind} placeholder="Enter Comment" />

    <select {...debit.bind}>
      {deb.map((val, key) => (
        <option value={val} key={key}>{val}</option>
      ))}
    </select>

    <button onClick={handleEntry}>Enter</button>
  </div>
);
}

export default Expense 
