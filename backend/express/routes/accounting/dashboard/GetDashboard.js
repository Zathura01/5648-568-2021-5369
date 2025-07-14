const express = require('express');
const router = express.Router();
const Save = require('../../../models/accounting/dashboard/Savingdash')
const Invest = require('../../../models/accounting/dashboard/Investdash');
const Expense = require('../../../models/accounting/dashboard/Expensedash');



router.get('/getdata/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const [saveDocs, investDocs, expenseDocs] = await Promise.all([
      Save.findOne({ userId }),
      Invest.findOne({ userId }),
      Expense.findOne({ userId })
    ]);

    res.status(200).json({
      save: saveDocs,
      invest: investDocs || {},
      expense: expenseDocs
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
