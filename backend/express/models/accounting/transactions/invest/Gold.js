// models/Gold.js
const mongoose = require('mongoose');

const goldSchema = new mongoose.Schema({
  purchaseAmount: {
    type: Number,
    required: true
  },
  marketSellAmount: {
    type: Number,
    required: true
  },
  qtyPurchased: {
    type: Number,
    required: true
  },
  date: {
  type: Date,
  required: true,
  default: Date.now
},
  comment: {
    type: String
  },
  debitFrom: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register',
    required: true
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

module.exports = mongoose.model('Gold', goldSchema);
