const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

//Create new login
router.post('/', loginController.create);

module.exports = router;