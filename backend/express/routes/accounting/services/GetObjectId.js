const express = require('express')
const mongoose = require('mongoose')


 const getObjectId = (id) => {
        return mongoose.Types.ObjectId.isValid(id) && typeof id === 'string'
            ? new mongoose.Types.ObjectId(id)
            : id;
    };

module.exports = getObjectId