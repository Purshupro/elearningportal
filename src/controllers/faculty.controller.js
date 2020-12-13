'use strict';

const Faculty = require('../models/faculty.model');

exports.findAll = (req, res) => {
    Faculty.findAll((err, faculty) => {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        console.log('res', faculty);
        res.send(faculty);
    });
};

exports.create = (req, res) => {
    console.log('Body', req.body);
    const newStudent = Faculty(req.body);

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
        Faculty.create(newStudent, (err, faculty) => {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                message: 'Faculty added successfully',
                data: faculty
            })
        })
    }
}

exports.update = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please provide all required field"
        })
    } else {
        Faculty.update(req.params.id, Faculty(req.body), (err, faculty) => {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                message: 'Faculty updated successfully',
                data: faculty
            })
        })
    }
}

exports.delete = (req, res) => {
    Faculty.deleteById(req.params.id, (err, faculty) => {
        if (err) {
            res.send(err);
        }
        res.json({
            error: false,
            message: 'Faculty successfully deleted',
            data: faculty
        })
    })
}