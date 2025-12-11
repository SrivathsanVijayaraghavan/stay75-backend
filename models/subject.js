const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  classesConducted: { type: Number, required: true, default: 0 },
  classesAttended: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Subject', subjectSchema);
