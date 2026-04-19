const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Programming', 'Design', 'Math', 'Writing', 'General', 'Other'],
    default: 'General'
  },
  urgency: {
    type: String,
    enum: ['urgent', 'medium', 'low'],
    default: 'low'
  },
  status: {
    type: String,
    enum: ['open', 'solved'],
    default: 'open'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  helpers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);