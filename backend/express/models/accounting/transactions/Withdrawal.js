// models/Withdrawal.js
const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
  type: Date,
  required: true,
  default: Date.now
},
  comment: String,
  creditTo: {
    type: String,
    enum: ['SBI', 'AXIS', 'IDBI', 'MISC', 'PHYSICAL'],
    required: true
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

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
