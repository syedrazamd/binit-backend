const express = require('express');
const router = express.Router();
const multer = require('multer');
const Complaint = require('../models/Complaint');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  const c = new Complaint({
    issueType: req.body.issueType,
    description: req.body.description,
    image: req.file.filename,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  await c.save();
  res.send({ message: 'Complaint Submitted' });
});

router.get('/', async (req, res) => {
  const data = await Complaint.find();
  res.json(data);
});

module.exports = router;