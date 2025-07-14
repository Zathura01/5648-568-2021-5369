const mongoose = require('mongoose');

const SavingdashSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Register'
    },
    SBI:{
        type: Number,
        default: 0
    },
    AXIS:{
        type:Number,
        default:0
    },
    IDBI:{
        type:Number,
        default:0
    },
    MISC:{
        type:Number,
        default:0
    },
    TOTAL:{
        type: Number,
        default:0
    }
})

module.exports = mongoose.model('saveDash', SavingdashSchema)