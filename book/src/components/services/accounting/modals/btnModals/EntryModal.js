import React from 'react'
import Income from './Income';
import Invest from './Invest';
import Expense from './Expense';
import Saving from './Saving';
import Withdrawal from './Withdrawal';
// import '../entries/cssfiles/Modal.css'


function EntryModal({ value }) {

    const showRender = () => {
        switch (value) {
            case 0: return <Income />;
            case 1: return <Invest />;
            case 2: return <Expense />;
            case 3: return <Saving />;
            case 4: return <Withdrawal />
            default: return <div>Select something</div>;
        }
    }

    return (
        <div className='modalPage'>
            {showRender()}
        </div>
    )
}

export default EntryModal
