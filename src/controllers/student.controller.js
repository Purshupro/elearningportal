'use strict';

const Student = require('../models/student.model');

exports.findAll = (req, res) => {
    Student.findAll((err, student) => {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        console.log('res', student);
        res.send(student);
    });
};

exports.create = (req, res) => {
    console.log('Body', req.body);
    const newStudent = Student(req.body);

    //handle null error
    if (
        req.body.constructor === Object &&
        Object.keys(req.body).length === 0
    ) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        })
    } else {
        Student.create(newStudent, (err, student) => {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                message: 'Student added successfully',
                data: student
            })
        })
    }
}

exports.delete = (req, res) => {
    Student.deleteById(req.params.id, (err, student) => {
        if (err) {
            res.send(err);
        }
        res.json({
            error: false,
            message: 'Student successfully deleted',
            data: student
        })
    })
}