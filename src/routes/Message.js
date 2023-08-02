const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

router.post('/addMsg',messageController.addMessage);
router.post('/getMsg',messageController.getAllMessages);


module.exports = router;