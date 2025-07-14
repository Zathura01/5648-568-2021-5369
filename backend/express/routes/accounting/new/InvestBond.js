//  userId: UserCtx.user.id,
//       period: parseFloat(period.val),
//       amount: parseFloat(amount.val),
//       interestAtStart: parseFloat(interestAtStart.val),
//       date: new Date.now(),
//       comment: comment.val,
//       debit: debit.val,
const express = require('express');
const Bond = require('../../../models/accounting/transactions/invest/Bond');
const TransactionService = require('../services/Transactionservice');
const Saveservice = require('../services/Saveservice')




const investBond =async(req)=>{

    const { userId, period, amount, interestAtStart, date, comment, debit } = req.body;

    const dataToupdateinSAVES = {
        userId, category: debit, amount: -amount, comment: `Bond investment from ${debit}`
    }
    const resultOfSaveservice = await Saveservice(dataToupdateinSAVES)

    if (resultOfSaveservice.flag) {


        const dataTosendintoBond = {
            userId, period, interestAtStart, amount, date, comment, debitFrom: debit
        }
        const newBondEntry = new Bond(dataTosendintoBond)
        await newBondEntry.save()



        //  userId, serialId, amount, type, desc, comment 

        const dataToupdateinTRANSACTION = {
            userId, serialId: newBondEntry._id, amount, type: `BOND Investment from ${debit}`, desc: 'Bond', comment
        }
        await TransactionService(dataToupdateinTRANSACTION)

        return { message: 'Bond Transaction completed', flag:true };


    } else {
        return { message: resultOfSaveservice.msg, flag:false }
    }


}

module.exports = investBond;