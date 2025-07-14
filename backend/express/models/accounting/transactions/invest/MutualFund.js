const mongoose = require('mongoose');

const mutualFundSchema = new mongoose.Schema({
  planType: {
    type: String,
    enum: ['LUMPSUM', 'SIP'],
    required: true,
  },
  purchaseAmount: {
    type: Number,
    required: true,
  },
  unitsBought: {
    type: Number,
    required: true,
  },
  unitCost: {
    type: Number,
    required: true,
  },
  date: {
  type: Date,
  required: true,
  default: Date.now
},
  comment: {
    type: String,
  },
  debitFrom: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Register'
  },
  month: {
  type: Number,
  required: false,
  default: ()=> new Date().getMonth()+1
},
year:{
    type: Number,
    required: false,
    default: () => new Date().getFullYear()
},
});

module.exports = mongoose.model('MutualFund', mutualFundSchema);
