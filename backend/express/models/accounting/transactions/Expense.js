const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register', // assuming 'Register' is your user model
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Food', 'Shelter', 'Gas', 'Bike', 'Stationary', 'Smoke',
      'Shopping', 'Washing', 'Wine', 'Medicine', 'Jio', 'Misc'
    ],
    required: true,
  },
  subcategory: {
    type: String,
    trim: true,
    default: ''
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
  comment: {
    type: String,
    trim: true
  },
  debitFrom: {
    type: String,
    enum: ['SBI', 'AXIS', 'IDBI', 'MISC'],
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
}
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
