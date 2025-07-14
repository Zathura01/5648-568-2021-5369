
const express = require('express');
const Upload = require('../../models/logger/Upload');
const router = express.Router()



router.get('/getAll/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const videos = await Upload.find({ userId }, '_id fileName createdAt');
    res.status(200).json(videos);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch videos' });
  }
});


router.get('/getSelected/:id', async (req, res) => {
  try {
    const video = await Upload.findById(req.params.id);
    if (!video) return res.status(404).send('Video not found');

    res.set({
      'Content-Type': video.contentType,
      'Content-Length': video.data.length,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache',
      'Content-Disposition': 'inline; filename="' + video.fileName + '"'
    });

    res.send(video.data); // this must be Buffer
  } catch (err) {
    console.error(err);
    res.status(500).send('Error streaming video');
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    await Upload.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});


module.exports = router;