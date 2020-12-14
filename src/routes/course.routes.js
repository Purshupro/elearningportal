const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

//Retrieve all Faculty
router.get('/', courseController.findAll);

//Create new student
router.post('/', courseController.create);

//Delete a student
router.delete('/:id', courseController.delete);

//Update student
router.put('/:id', courseController.update);

module.exports = router;