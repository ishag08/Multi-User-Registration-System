const express = require('express');
const router = express.Router();
const scpController = require('../controllers/scpController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.get('/dashboard', authMiddleware.authenticate, authMiddleware.authorizeSCP, scpController.getDashboard); //SCP dashboard 

router.post('/register/farmer',authMiddleware.authenticate, authMiddleware.authorizeSCP, scpController.registerFarmerBySCP);

module.exports = router;