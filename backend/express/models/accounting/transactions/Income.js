const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
  type: Date,
  required: true,
  default: Date.now
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
  comment: {
    type: String,
    trim: true
  },
  creditTo: {
    type: String,
    enum: ['SBI', 'AXIS', 'IDBI', 'MISC'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Income', IncomeSchema);
