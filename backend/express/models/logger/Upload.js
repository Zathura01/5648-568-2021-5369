const express = require('express');
const mongoose = require('mongoose');

// Mongo schema
const UploadSchema = new mongoose.Schema({
  fileName: String,
  data: Buffer,
  contentType: String,
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
      required: true
    },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Upload', UploadSchema);

