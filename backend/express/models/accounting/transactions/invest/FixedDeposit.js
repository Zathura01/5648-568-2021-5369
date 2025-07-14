const mongoose = require('mongoose');

const FixedDepositSchema = new mongoose.Schema({
    
    amount: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    date: {
  type: Date,
  required: true,
  default: Date.now
},
    comment: {
        type: String,
        default: ''
    },
    debitFrom: {
        type: String,
        required: true
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
}, {
    timestamps: true
});

module.exports = mongoose.model('FixedDeposit', FixedDepositSchema);
