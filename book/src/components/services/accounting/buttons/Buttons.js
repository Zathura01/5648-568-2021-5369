import React from 'react'
import { useModal } from '../../../context/ModalContext'
import EntryModal from '../modals/btnModals/EntryModal'
import '../buttons/Stylebtns.css'
import { useUserContext } from '../../../context/UserContext'


function Buttons() {

    const { showModal } = useModal()
    const userCtx = useUserContext()
    const handleModals = (numb) => { 
        showModal(
            <EntryModal value={numb}  />
        )
    }

    return (
        <>
            <div className={`btns ${userCtx.setting?'lightTheme':'darkTheme'}`}>
                <button onClick={() => handleModals(0)} >Income</button>
                <button onClick={() => handleModals(1)} >Invest</button>
                <button onClick={() => handleModals(2)} >Expense</button>
                <button onClick={() => handleModals(3)} >Saving</button>
                <button onClick={() => handleModals(4)} >Withdrawal</button>
            </div>
        </>
    )
}

export default Buttons