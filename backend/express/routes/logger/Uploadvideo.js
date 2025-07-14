const express = require('express');
const router = express.Router();
const multer = require('multer');
const Upload = require('../../models/logger/Upload');




// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const newVideo = new Upload({
      fileName: req.body.fileName || 'Untitled',
      data: req.file.buffer,
      contentType: req.file.mimetype,
      userId: req.body.userId
    });

    await newVideo.save();
    res.status(201).json({ message: 'Video uploaded and saved to DB' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});





module.exports = router;
