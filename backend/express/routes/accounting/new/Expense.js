//  userId: userCtx.user.id,
//       category: category.val,
//       subcategory: subcategory.val,
//       amount: Number(amount.val),
//       date: new Date(date.val),
//       comment: comment.val,
//       debitFrom: debit.val


const express = require('express');
const Expense = require('../../../models/accounting/transactions/Expense');
const Saveservice = require('../services/Saveservice');
const TransactionService = require('../services/Transactionservice');
const Expensedash = require('../../../models/accounting/dashboard/Expensedash');
const router = express.Router()
const getObjectId = require('../services/GetObjectId')




router.post('/Expense', async (req, res) => {

    const { userId, category, subcategory, amount, date, comment, debitFrom } = req.body;

    //  userId, category, amount, comment 

    const dataToupdateinSAVES = {
        userId, category: debitFrom, amount: -amount, comment: `Expense on ${category}`
    }
    const resultOfSaveservice = await Saveservice(dataToupdateinSAVES)

    if (resultOfSaveservice.flag) {


        const dataTosendintoExpense = {
            userId, category, subcategory, amount, date, comment, debitFrom
        }
        const newExpenseEntry = new Expense(dataTosendintoExpense)
        await newExpenseEntry.save()



        const objectUserId = getObjectId(userId)
        let findUserinExpenseDash = await Expensedash.findOne({ userId: objectUserId });
        if (!findUserinExpenseDash) {
            // Create new dashboard
            const newExpenseDashEntry = new Expensedash({
                userId: objectUserId,
                Food: 0,
                Shelter: 0,
                Gas: 0,
                Bike: 0,
                Stationary: 0,
                Smoke: 0,
                Shopping: 0,
                Wine: 0,
                Washing: 0,
                Medicine: 0,
                Jio: 0,
                Health: 0,
                Misc: 0,
                TOTAL: 0
            });
            newExpenseDashEntry[category] = amount;
            newExpenseDashEntry.TOTAL = amount;
            await newExpenseDashEntry.save()
        } else {
            findUserinExpenseDash[category] += amount;
            findUserinExpenseDash.TOTAL += amount;
            await findUserinExpenseDash.save();
        }


        //  userId, serialId, amount, type, desc, comment 

        const dataToupdateinTRANSACTION = {
            userId, serialId: newExpenseEntry._id, amount, type: `Expense on ${category} from ${debitFrom}`, desc: 'Expense', comment
        }
        await TransactionService(dataToupdateinTRANSACTION)

        res.status(201).json({ message: 'Expense Transaction completed' });

    } else {
        res.status(201).json({ message: resultOfSaveservice.msg })
    }


})

module.exports = router;