import React, { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import TransactionList from '../../services/accounting/transactions/TransactionList';
import Dashboard from '../../services/accounting/dashboards/Dashboard';
import Bottom from '../../services/accounting/bottommid/Bottom';
import Split from 'react-split';
import Buttons from '../../services/accounting/buttons/Buttons';
import '../userspecific/Stylespecific.css';

function Accounting() {
    const userCtx = useUserContext();

    useEffect(() => {
        console.log('Accounting component mounted or userCtx changed');
    }, [userCtx.setting]);

    return (
        <div className={`containerAccounting ${userCtx.setting ? 'theme-light' : 'theme-dark'}`}>
            <Split
                sizes={[20, 80]} // 20% for TransactionList, 80% for Dashboard
                minSize={200}
                direction="horizontal"
                style={{ display: 'flex', flex: 1 }} // Make it grow to available space
            >
                <div className="containerAccountingleft">
                    <TransactionList />
                </div>
                <div className="containerAccountingright">
                    <div className="containerAccountingright-top">
                        <Dashboard />
                    </div>
                    <div className="containerAccountingright-bottom">
                        <div className={`containerAccountingleft-bottom ${userCtx.setting?'lightTheme':'darkTheme'} `}>
                            <Bottom />
                        </div>
                        <div className={`containerAccountingright-bottom-inner ${userCtx.setting?'lightTheme':'darkTheme'} `}>
                            <Buttons />
                        </div>
                    </div>
                </div>
            </Split>

        </div>
    );
}

export default Accounting;
