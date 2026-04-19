const Request = require('../models/request');
const User = require('../models/user');

// AI categorize (same logic as your frontend)
function aiCategorize(text) {
  text = text.toLowerCase();
  let category = 'General';
  let urgency = 'low';

  if (text.includes('python') || text.includes('javascript') ||
      text.includes('code') || text.includes('bug') ||
      text.includes('react') || text.includes('html') || text.includes('css')) {
    category = 'Programming';
  } else if (text.includes('design') || text.includes('figma') ||
             text.includes('ui') || text.includes('ux')) {
    category = 'Design';
  } else if (text.includes('math') || text.includes('algebra') ||
             text.includes('calculus')) {
    category = 'Math';
  }

  if (text.includes('urgent') || text.includes('asap') ||
      text.includes('exam') || text.includes('tomorrow') ||
      text.includes('deadline')) {
    urgency = 'urgent';
  } else if (text.includes('soon') || text.includes('today') ||
             text.includes('help')) {
    urgency = 'medium';
  }

  return { category, urgency };
}

// Create a request
exports.createRequest = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { category, urgency } = aiCategorize(title + ' ' + description);

    const request = await Request.create({
      title,
      description,
      category,
      urgency,
      postedBy: req.user.id
    });

    res.status(201).json({ message: 'Request created!', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('postedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get my requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark as solved
exports.markSolved = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    request.status = 'solved';
    await request.save();

    res.json({ message: 'Marked as solved!', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Offer help
exports.offerHelp = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Not found' });

    if (!request.helpers.includes(req.user.id)) {
      request.helpers.push(req.user.id);
      await request.save();

      // Increment peopleHelped for this user
      await User.findByIdAndUpdate(req.user.id, { $inc: { peopleHelped: 1 } });
    }

    res.json({ message: 'You are now helping!', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};