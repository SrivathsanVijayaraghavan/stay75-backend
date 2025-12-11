const express = require('express');
const router = express.Router();
const userdataController = require('../controllers/userdatacontroller');
const authMiddleware = require('../middleware/middleware');

router.post('/save', authMiddleware, userdataController.saveUserData);
router.get('/', authMiddleware, userdataController.getUserData);

module.exports = router;
