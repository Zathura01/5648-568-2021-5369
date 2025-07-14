import React, { useEffect, useState } from 'react';
import Save from './Save';
import Invest from './Invest';
import Expense from './Expense';
import '../dashboards/Dashboard.css'
import { useUserContext } from '../../../context/UserContext';
import { useTransactionContext } from '../../../context/TransactionContext';



const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'


function Dashboard() {
    const [currentView, setCurrentView] = useState(0);
    const [saveData, setSaveData] = useState(null);
    const [investData, setInvestData] = useState(null);
    const [expData, setExpData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userCtx = useUserContext()
    const { trans } = useTransactionContext();

    const handleChangeViewLeft = () => {
        setCurrentView((prev) => {
            const updated = (prev - 1 + 3) % 3;
            return updated;
        });
    };

    const handleChangeViewRight = () => {
        setCurrentView((prev) => (prev + 1) % 3);
    };

    const runFetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${apiUrl}/${apiKey}/dashboard/getdata/${userCtx.user.id}`);
            const jdata = await res.json();
            if (jdata.save) setSaveData(jdata.save);
            if (jdata.invest) setInvestData(jdata.invest);
            if (jdata.expense) setExpData(jdata.expense);
        } catch (err) {
            console.error('Fetch failed:', err);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        runFetch();
    }, [trans]);

    if (loading) return <p>Loading dashboard...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className='dash'>
            <div className="hover-zone left-zone" onClick={handleChangeViewLeft}>
                <button className="nav-button">◀</button>
            </div>

            <div className="hover-zone right-zone" onClick={handleChangeViewRight}>
                <button className="nav-button">▶</button>
            </div>
            <div className='viewDash'>
                {currentView === 0 && <Save data={saveData} />}
                {currentView === 1 && <Invest data={investData} />}
                {currentView === 2 && <Expense data={expData} />}
            </div>

        </div>
    );
}

export default Dashboard;
