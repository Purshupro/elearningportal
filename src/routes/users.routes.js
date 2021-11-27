const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

//Retrieve all students
router.get('/', usersController.findAll);

//Create new users
router.post('/', usersController.create);

//Delete a users
router.delete('/:id', usersController.delete);

//Update users
router.put('/:id', usersController.update);

module.exports = router;