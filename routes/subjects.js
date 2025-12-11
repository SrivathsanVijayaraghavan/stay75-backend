const express = require('express');
const router = express.Router();
const {
  getSubjects,
  addSubject,
  updateSubject
} = require('../controllers/subjectcontroller');

router.get('/', getSubjects);
router.post('/', addSubject);
router.patch('/:id', updateSubject);

module.exports = router;
