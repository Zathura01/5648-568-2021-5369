const express = require('express');
const FixedDeposit = require('../../../models/accounting/transactions/invest/FixedDeposit');
const TransactionService = require('../services/Transactionservice');
const Saveservice = require('../services/Saveservice')


//  userId: userCtx.user.id,
//           amount: Number(amount.val),
//           interestRate: Number(interestRate.val),
//           date: new Date(date.val),
//           comment: comment.val,
//           debit: debit.val,

const investFixedDeposit = async (req) => {

    const { userId, amount, interestRate, date, comment, debit } = req.body;

    const dataToupdateinSAVES = {
        userId, category: debit, amount: -amount, comment: `FixedDeposit investment from ${debit}`
    }
    const resultOfSaveservice = await Saveservice(dataToupdateinSAVES)

    if (resultOfSaveservice.flag) {


        const dataTosendintoFixedDeposit = {
            userId, interestRate, amount, date, comment, debitFrom: debit
        }
        const newFixedDepositEntry = new FixedDeposit(dataTosendintoFixedDeposit)
        await newFixedDepositEntry.save()



        //  userId, serialId, amount, type, desc, comment 

        const dataToupdateinTRANSACTION = {
            userId, serialId: newFixedDepositEntry._id, amount, type: `FixedDeposit Investment from ${debit}`, desc: 'FixedDeposit', comment
        }
        await TransactionService(dataToupdateinTRANSACTION)

        return { message: 'Bond Transaction completed', flag: true };


    } else {
        return { message: resultOfSaveservice.msg, flag: false }
    }


}

module.exports = investFixedDeposit;