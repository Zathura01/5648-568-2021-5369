const mongoose = require('mongoose');

const  BondSchema = new mongoose.Schema({
  period: {
    type: Number,
    required: true,
    min: 1, // months or years depending on your logic
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  interestAtStart: {
    type: Number,
    required: true,
    min: 0,
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
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
      required: true
    },
  debitFrom: {
    type: String,
    required: true,
    enum: [ // Match this with your `DebitFrom` list
      'SBI', 'AXIS', 'IDBI', 'MISC'
    ]
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

module.exports = mongoose.model('Bond', BondSchema);
