const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/upcomingEvent.controller');

//Retrieve all
router.get('/', eventsController.findAll);

//Create new
router.post('/', eventsController.create);


module.exports = router;