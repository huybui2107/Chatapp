const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register' ,userController.register);
router.post('/login',userController.login);
router.post('/setAvatar/:id',userController.setAvatar);
router.get('/allUsers/:id',userController.getAllUser);
router.get('/logout/:id',userController.logout);
module.exports = router;