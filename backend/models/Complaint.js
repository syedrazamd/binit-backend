const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  issueType: String,
  description: String,
  image: String,
  latitude: String,
  longitude: String,
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
