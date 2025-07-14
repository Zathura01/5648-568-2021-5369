const express = require('express')
const investBond = require('./InvestBond')
const investGold = require('./InvestGold')
const investMutualFund = require('./InvestMutualFund')
const investFixedDeposit = require('./InvestFixedDeposit')
const getObjectId = require('../services/GetObjectId')
const Investdash = require('../../../models/accounting/dashboard/Investdash')
const router = express.Router()

const updateInvestDash = async(category, amount, userId, qty) => {
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
          if(qty!=null) {newInvestDashEntry['goldqty'] = qty;}
          newInvestDashEntry.TOTAL = amount;
          await newInvestDashEntry.save()
     } else {
          findInvestDash[category] += amount;
          if(qty != null) findInvestDash['goldqty'] = qty;
          findInvestDash.TOTAL += amount;
          await findInvestDash.save();
     } 

}



router.post('/Bond', async (req, res) => {
     
     const result = await investBond(req)
     const { amount, userId} = req.body
     if(result.flag){
          updateInvestDash('bond',amount,userId, null)
     }
     res.status(201).json({ message: result.message })
})

router.post('/Gold', async (req, res) => {
     const result = await investGold(req)
     const { purchaseAmount, userId, qtyPurchased} = req.body
     if(result.flag){
          updateInvestDash('gold',purchaseAmount,userId, qtyPurchased)
     }
     res.status(201).json({ message: result.message })
})

router.post('/MutualFund', async (req, res) => {
     const result = await investMutualFund(req)
     const { purchaseAmount, userId} = req.body
     if(result.flag){
          updateInvestDash('mutualfund',purchaseAmount,userId, null)
     }
     res.status(201).json({ message: result.message })
})


router.post('/FixedDeposit', async (req, res) => {
     const result = await investFixedDeposit(req)
     const { amount, userId} = req.body
     if(result.flag){
          updateInvestDash('fixeddeposit',amount,userId, null)
     }
     res.status(201).json({ message: result.message })
})


module.exports = router;