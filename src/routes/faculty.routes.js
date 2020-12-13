const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty.controller');

//Retrieve all Faculty
router.get('/', facultyController.findAll);

//Create new student
router.post('/', facultyController.create);

//Delete a student
router.delete('/:id', facultyController.delete);

//Update student
router.put('/:id', facultyController.update);

module.exports = router;