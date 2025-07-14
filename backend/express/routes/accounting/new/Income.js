const express = require('express')
const router = express.Router();
const Saveservice = require('../services/Saveservice');
const TransactionService = require('../services/Transactionservice');
const Income = require('../../../models/accounting/transactions/Income')


router.post("/Income", async(req, res) => {
    const { userId, source, amount, date, comment, creditTo} = req.body;
    
    
    const newIncome = new Income({
        userId,
        source,
        amount,
        date,
        comment,
        creditTo
    })
    await newIncome.save();

    const sendToSaveservice = {
        userId,
        category: creditTo,
        amount,
        comment
    }
    const saveServiceResult = await Saveservice( sendToSaveservice );

    const sendToTransactionService = {
        userId : userId,
        serialId : newIncome._id,
        date,
        amount,
        type: `Income from ${source} to ${creditTo}`,
        desc: "Income",
        comment
    }
    await TransactionService( sendToTransactionService )

   res.status(201).json({ message: `Income, ${saveServiceResult.msg} and Transaction saved` });

});

module.exports = router