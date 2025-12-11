const Subject = require('../models/subject');

// Generate safe leave dates
exports.getSafeLeaveDates = async (req, res) => {
  try {
    const subjects = await Subject.find();
    const leaveData = subjects.map(subject => {
      const { name, classesConducted, classesAttended } = subject;
      // Max leaves while keeping 75% attendance
      const maxLeaves = Math.floor((classesAttended / 0.75) - classesConducted);
      return {
        name,
        maxLeaves: maxLeaves > 0 ? maxLeaves : 0
      };
    });
    res.json(leaveData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
