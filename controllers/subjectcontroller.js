const Subject = require('../models/subject');

// Get all subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new subject
exports.addSubject = async (req, res) => {
  try {
    const { name, classesConducted, classesAttended } = req.body;
    const existing = await Subject.findOne({ name });
    if (existing) return res.status(400).json({ error: 'Subject already exists' });

    const subject = new Subject({ name, classesConducted, classesAttended });
    await subject.save();
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update subject attendance
exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { classesConducted, classesAttended } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      id,
      { classesConducted, classesAttended },
      { new: true }
    );
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
