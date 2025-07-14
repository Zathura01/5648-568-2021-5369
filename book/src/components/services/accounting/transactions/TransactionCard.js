// TransactionCard.js
import React from 'react';
import './TransactionCard.css';
import { useUserContext } from '../../../context/UserContext';

function TransactionCard({ data, onDelete }) {
  const { type, amount, desc, comment, _id, date, serialId } = data;
  const userCtx = useUserContext()


  return (
    <div className={`transaction-card ${userCtx.setting?'lightTheme':'darkTheme' } `}>
        <div className="transaction-content">
        <p><strong>Type:</strong> {desc}</p>
        <p><strong>Amount:</strong> ₹{amount}</p>
        <p><strong>Description:</strong> {type}</p>
        <p><strong>Comment:</strong> {comment ? (String(comment).length > 20 ? String(comment).slice(0, 20) + '...' : String(comment)) : "—"}</p>
        <p><strong>Date:</strong> {new Date(date).toLocaleString()}</p>
      </div>
      <div className="transaction-buttons">
        <button className="delete-btn" onClick={() => onDelete(_id, desc)}>Delete</button>
      </div> 
    </div>
  );
}

export default TransactionCard;
