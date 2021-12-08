const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities.controller');

//Retrieve all Faculty
router.get('/', activitiesController.findAll);

//Create new student
router.post('/', activitiesController.create);

//Delete a student
router.delete('/:id', activitiesController.delete);

//Update student
router.put('/:id', activitiesController.update);

//Update student
router.get('/:id', activitiesController.findOne);

module.exports = router;