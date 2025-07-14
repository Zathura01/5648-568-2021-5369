const express = require('express');
const Saveservice = require('../services/Saveservice');
const TransactionService = require('../services/Transactionservice');
const router = express.Router()



router.post('/Saving', async(req, res)=>{

 const { userId, category, amount, date, comment } = req.body;

  try {
    const newEntry = {
      userId,
      category,
      amount,
      date,
      comment,
    };

    const saved = await Saveservice( newEntry )
 
 
    const transact = {
            userId : userId,
            serialId : saved.saveId,
            date : date,
            amount ,
            type: `Saving to ${category}`,
            desc: "Save",
            comment : comment
        }
    const transaction = await TransactionService( transact );


    res.status(201).json({ message: 'Entry saved', entry: saved });
  } catch (err) {
    console.error('Error saving entry:', err);
    res.status(500).json({ message: 'Server error' });
  }

})


module.exports = router;