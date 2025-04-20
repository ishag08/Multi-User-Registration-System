const express=require('express');
const router= express.Router();
const authController=require('../controllers/authController');

router.post('/register/scp',authController.registerSCP);
router.post('/register/farmer',authController.registerFarmer);

router.post('/login/scp',authController.loginSCP);
router.post('/login/farmer',authController.loginFarmer);

module.exports=router;


