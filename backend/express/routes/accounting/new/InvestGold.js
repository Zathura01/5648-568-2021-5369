const express = require('express');
const Gold = require('../../../models/accounting/transactions/invest/Gold');
const TransactionService = require('../services/Transactionservice');
const Saveservice = require('../services/Saveservice')


// userId: UserCtx.user.id,
//             purchaseAmount: parseFloat(purchaseAmount.val),
//             marketSellAmount: parseFloat(marketSellAmount.val),
//             qtyPurchased: parseFloat(qtyPurchased.val),
//             date: new Date.now(),
//             comment: comment.val,
//             debitFrom: debit.val,


const investGold =async(req)=>{

    const { userId, purchaseAmount, marketSellAmount, qtyPurchased, date, comment, debitFrom } = req.body;

    const dataToupdateinSAVES = {
        userId, category: debitFrom, amount: -purchaseAmount, comment: `Gold investment from ${debitFrom}`
    }
    const resultOfSaveservice = await Saveservice(dataToupdateinSAVES)

    if (resultOfSaveservice.flag) {


        const dataTosendintoBond = {
             userId, purchaseAmount, marketSellAmount, qtyPurchased, date, comment, debitFrom 
        }
        const newGoldEntry = new Gold(dataTosendintoBond)
        await newGoldEntry.save()



        //  userId, serialId, amount, type, desc, comment 

        const dataToupdateinTRANSACTION = {
            userId, serialId: newGoldEntry._id, amount: purchaseAmount, type: `Gold Investment from ${debitFrom}`, desc: 'Gold', comment
        }
        await TransactionService(dataToupdateinTRANSACTION)

        return { message: 'Gold Transaction completed', flag: true };


    } else {
        return { message: resultOfSaveservice.msg, flag: false }
    }


}

module.exports = investGold;