const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  subjects: [
    {
      name: String,
      classesAttended: Number,
      classesConducted: Number,
      timetable: [
        {
          day: Number,     // 0–4 (Mon–Fri)
          period: Number
        }
      ]
    }
  ],
  safeLeaveDates: [String], // leave dates as strings
  endDate: Date,
  periodsPerDay: Number
});

module.exports = mongoose.model('UserData', UserDataSchema);
