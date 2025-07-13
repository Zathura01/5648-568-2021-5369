const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipCode: { type: String, required: false },
    profilePicture: { type: String, required: false },
    bio: { type: String, required: false },
    website: { type: String, required: false },
    socialMediaLinks: { type: Map, of: String, required: false },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
    country: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Register', RegisterSchema);