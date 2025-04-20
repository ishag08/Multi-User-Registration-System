const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/network', authMiddleware.authenticate, authMiddleware.authorizeFarmer, farmerController.getNetwork);

module.exports = router;