const express = require('express');
const router = express.Router();
const { getSafeLeaveDates } = require('../controllers/leavecontroller');

router.get('/', getSafeLeaveDates);

module.exports = router;
