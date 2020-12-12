const express = require('express');

const router = express.Router();

const studentController = require('../controllers/student.controller');

//Retrieve all students
router.get('/', studentController.findAll);

//Create new student
router.post('/', studentController.create);

//Delete a student
router.delete('/:id', studentController.delete);

//Update student
router.put('/:id', studentController.update);

module.exports = router;