 
const express = require('express');
const MutualFund = require('../../../models/accounting/transactions/invest/MutualFund');
const TransactionService = require('../services/Transactionservice');
const Saveservice = require('../services/Saveservice')


// userId: UserCtx.user.id,
//             planType: planType.val,
//             purchaseAmount: parseFloat(purchaseAmount.val),
//             unitsBought: parseFloat(unitsBought.val),
//             unitCost: parseFloat(unitCost.val),
//             date: new Date.now(),
//             comment: comment.val,
//             debitFrom: debit.val

const investMutualFund =async(req)=>{

    const { userId, planType, purchaseAmount, unitsBought, unitCost, date, comment, debitFrom } = req.body;

    const dataToupdateinSAVES = {
        userId, category: debitFrom, amount: -purchaseAmount, comment: `MutualFund investment from ${debitFrom}`
    }
    const resultOfSaveservice = await Saveservice(dataToupdateinSAVES)

    if (resultOfSaveservice.flag) {


        const dataTosendintoMutualFund = {
            userId, planType, purchaseAmount, unitsBought, unitCost, date, comment, debitFrom
        }
        const newMutualFundEntry = new MutualFund(dataTosendintoMutualFund)
        await newMutualFundEntry.save()



        //  userId, serialId, amount, type, desc, comment 

        const dataToupdateinTRANSACTION = {
            userId, serialId: newMutualFundEntry._id, amount: purchaseAmount, type: `MutualFund Investment from ${debitFrom}`, desc: 'MutualFund', comment
        }
        await TransactionService(dataToupdateinTRANSACTION)

        return { message: 'MutualFund Transaction completed', flag: true };


    } else {
        return { message: resultOfSaveservice.msg, flag: false }
    }


}

module.exports = investMutualFund;