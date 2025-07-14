
// userId: userCtx.user.id,
//       amount: parseFloat(amount.val),
//       date: new Date(date.val),
//       comment: comment.val,
//       creditTo: credit.val,
//       debitFrom: debit.val

const express = require('express')
const router = express.Router()

// const debitFrom = {
//   SAVE: ['SBI', 'AXIS', 'IDBI', 'MISC'],
//   INVEST: ['FIXEDDEPOSIT', 'BOND', 'GOLD', 'MUTUALFUND'],
//   MISC: ['CASH', 'GIFT', 'OTHER']
// };


router.post('/Withdrawal', async (req, res) => {

    const { userId, amount, date, comment, creditTo, debitFrom } = req.body

    if (debitFrom === 'SAVE') {
        const creditUpdateinSAVES = {
            userId, category: creditTo, amount: -amount, comment: `Withdrawal from ${debitFrom}`
        }
        const creditSaveservice = await Saveservice(creditUpdateinSAVES)
    }



})

module.exports = router;

