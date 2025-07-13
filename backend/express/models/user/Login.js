const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    userName: { type: String, required: true }, 
    password: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Register', required: true },
    loginTime: { type: Date, default: Date.now },
    ipAddress: { type: String, required: false },
    deviceInfo: { type: String, required: false },
});

module.exports = mongoose.model('Login', LoginSchema);