const express = require('express')
const mongoose = require('mongoose')


const transactionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required: true
    },
    serialId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'desc'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
        enum: ['Income', 'Expense', 'Save', 'Withdrawal', 'FixedDeposit', 'Bond', 'Gold', 'MutualFund']
    },
    comment: {
        type: String
    },
    month: {
        type: Number,
        required: false,
        default: () => new Date().getMonth() + 1
    },
    year: {
        type: Number,
        required: false,
        default: () => new Date().getFullYear()
    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);