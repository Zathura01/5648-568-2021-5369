const mongoose = require('mongoose')


const InvestdashSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Register'
    },
    gold: {
        type: Number,
        default: 0
    },
    goldqty: {
        type: Number,
        default: 0

    },
    mutualfund: {
        type: Number, default: 0

    },
    fixeddeposit: {
        type: Number, default: 0

    },
    bond: {
        type: Number, default: 0

    },
    TOTAL: {
        type: Number, default: 0
    }

})

module.exports = mongoose.model('investDash', InvestdashSchema);