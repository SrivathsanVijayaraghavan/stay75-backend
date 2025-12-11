const UserData = require('../models/userdata');

exports.saveUserData = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { subjects, safeLeaveDates, endDate, periodsPerDay } = req.body;

    const doc = await UserData.findOneAndUpdate(
      { userId },
      { subjects, safeLeaveDates, endDate, periodsPerDay },
      { upsert: true, new: true }
    );

    res.json({ message: 'Saved', data: doc });
  } catch (err) {
    console.error('saveUserData error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const doc = await UserData.findOne({ userId });
    res.json({ data: doc });
  } catch (err) {
    console.error('getUserData error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
