const express = require('express');
const router = express.Router();

const Transaction = require('../../../models/accounting/transactions/Transaction')
const Saving = require('../../../models/accounting/transactions/Saving')
const Expense = require('../../../models/accounting/transactions/Expense')
const Investdash = require('../../../models/accounting/dashboard/Investdash')
const Savingdash = require('../../../models/accounting/dashboard/Savingdash')
const Expensedash = require('../../../models/accounting/dashboard/Expensedash');
const Income = require('../../../models/accounting/transactions/Income');
const FixedDeposit = require('../../../models/accounting/transactions/invest/FixedDeposit');
const Bond = require('../../../models/accounting/transactions/invest/Bond');
const Gold = require('../../../models/accounting/transactions/invest/Gold');
const MutualFund = require('../../../models/accounting/transactions/invest/MutualFund');
const getObjectId = require('../../../routes/accounting/services/GetObjectId')
const Saveservice = require('../../../routes/accounting/services/Saveservice')



const updateInvestDash = async (category, amount, userId, qty) => {
    const objectUserId = getObjectId(userId)
    let findInvestDash = await Investdash.findOne({ userId: objectUserId });
    if (!findInvestDash) {

        // Create new dashboard
        const newInvestDashEntry = new Investdash({
            userId: objectUserId,
            gold: 0,
            goldqty: 0,
            mutualfund: 0,
            fixeddeposit: 0,
            bond: 0,
            TOTAL: 0
        });
        newInvestDashEntry[category] = amount;
        if (qty != null) { newInvestDashEntry['goldqty'] = qty; }
        newInvestDashEntry.TOTAL = amount;
        await newInvestDashEntry.save()
    } else {
        findInvestDash[category] += amount;
        if (qty != null) findInvestDash['goldqty'] = qty;
        findInvestDash.TOTAL += amount;
        await findInvestDash.save();
    }

}


router.get('/getAllTransactions/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        if (!userId) return res.status(400).json({ error: "Missing userId" });

        const transactions = await Transaction.find({ userId }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.delete('/deleteTransaction/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query;

        if (!type) return res.status(400).json({ msg: 'Type is required' });

        const findTransaction = await Transaction.findById(id);
        if (!findTransaction) return res.status(404).json({ msg: 'Transaction not found' });

        const amount = findTransaction.amount;
        const serialId = findTransaction.serialId;

        await Transaction.findByIdAndDelete(id);

        let sendToSaveservice;


        switch (type) {
            case 'Income': {
                const income = await Income.findById(serialId);
                sendToSaveservice = {
                    userId: income.userId,
                    category: income.creditTo,
                    amount: -amount,
                    comment: "Income Transaction Delete Completed"
                };
                await Saveservice(sendToSaveservice);
                await Income.findByIdAndDelete(serialId);
                break;
            }

            case 'Expense': {
                const expense = await Expense.findById(serialId);
                sendToSaveservice = {
                    userId: expense.userId,
                    category: expense.debitFrom,
                    amount: amount,
                    comment: "Expense Transaction Delete Completed"
                };
                await Saveservice(sendToSaveservice);
                await Expense.findByIdAndDelete(serialId);
                break;
            }

            case 'Save': {
                const save = await Saving.findById(serialId);
                sendToSaveservice = {
                    userId: save.userId,
                    category: save.category,
                    amount: -amount,
                    comment: "Saving Transaction Delete Completed"
                };
                await Saveservice(sendToSaveservice);
                await Saving.findByIdAndDelete(serialId);
                break;
            }

            case 'Withdrawal': {
                // Implement if needed
                break;
            }

            case 'FixedDeposit': {
                const fd = await FixedDeposit.findById(serialId);
                await updateInvestDash('fixeddeposit', -amount, fd.userId, null);
                sendToSaveservice = {
                    userId: fd.userId,
                    category: fd.debitFrom,
                    amount: amount,
                    comment: "FixedDeposit Transaction Delete Completed"
                };
                await Saveservice(sendToSaveservice);
                await FixedDeposit.findByIdAndDelete(serialId);
                break;
            }

            case 'Bond': {
                const bond = await Bond.findById(serialId);
                await updateInvestDash('bond', -amount, bond.userId, null);
                sendToSaveservice = {
                    userId: bond.userId,
                    category: bond.debitFrom,
                    amount: amount,
                    comment: "Bond Transaction Delete Completed"
                };
                await Saveservice(sendToSaveservice);
                await Bond.findByIdAndDelete(serialId);
                break;
            }

            case 'Gold': {
                const gold = await Gold.findById(serialId);
                await updateInvestDash('gold', -amount, gold.userId, gold.qtyPurchased);
                sendToSaveservice = {
                    userId: gold.userId,
                    category: gold.debitFrom,
                    amount: amount,
                    comment: "Gold Transaction Delete Completed"
                };
                await Saveservice(sendToSaveservice);
                await Gold.findByIdAndDelete(serialId);
                break;
            }

            case 'MutualFund': {
                const mf = await MutualFund.findById(serialId);
                await updateInvestDash('mutualfund', -amount, mf.userId, null);
                sendToSaveservice = {
                    userId: mf.userId,
                    category: mf.debitFrom,
                    amount: amount,
                    comment: "MutualFund Transaction Delete Completed"
                };
                await Saveservice(sendToSaveservice);
                await MutualFund.findByIdAndDelete(serialId);
                break;
            }

            default:
                return res.status(400).json({ msg: 'Invalid type' });
        }

        res.status(200).json({ msg: 'Transaction Deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.put('/updateTransaction/:id', async (req, res) => {
    try {
        const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Update failed' });
    }
});

module.exports = router;



