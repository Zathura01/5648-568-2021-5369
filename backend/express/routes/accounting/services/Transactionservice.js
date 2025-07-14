const express = require('express')
const Transaction = require('../../../models/accounting/transactions/Transaction')
const router = express.Router()


const TransactionService = async ({ userId, serialId, amount, type, desc, comment }) => {
    const dataToSend = {
        userId,
        serialId,
        amount,
        type,
        desc,
        comment
    };

    const saveTrans = new Transaction({ ...dataToSend });
    await saveTrans.save();
};

module.exports = TransactionService;

