import React from "react";
import TakeInput from "../../../../hooks/TakeEntry";


import '../btnModals/css/Invest.css'
import Gold from "./investCategories/Gold";
import MutualFund from "./investCategories/MutualFund";
import FixedDeposit from "./investCategories/FixedDeposit";
import Bond from "./investCategories/Bond";
                  



// INVEST mutualfund gold fixeddeposit longtermbond 
// Gold - userid source amount date marketrate qty cmt 
// mf - userid source amount date marketrate qty cmt
// fd - userid source amount date interest duration-year/month/days
// bond - userid source amount date interest duration-year/month 

const investOptions = [
  { label: 'Gold', component: Gold },
  { label: 'Mutual Funds', component: MutualFund },
  { label: 'Fixed Deposit', component: FixedDeposit },
  { label: 'Bond', component: Bond },
 ];

const Invest = () => {
  const cat = TakeInput('Gold');
  const SelectedComponent = investOptions.find(opt => opt.label === cat.val)?.component;

  return (
    <div className="invest-container">
      <label htmlFor="investment-select" className="invest-label">
        Select Investment Type:
      </label>

      <select
        id="investment-select"
        {...cat.bind}
        className="invest-select"
      >
        {investOptions.map((option, idx) => (
          <option key={idx} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="invest-content">
        {SelectedComponent && <SelectedComponent />}
      </div>
    </div>
  );
};

export default Invest ;
