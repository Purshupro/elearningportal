'use strict';

const Course = require('../models/course.model');

exports.findAll = (req, res) => {
    Course.findAll((err, course) => {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        console.log('res', course);
        res.send(course);
    });
};

exports.create = (req, res) => {
    console.log('Body', req.body);
    const newCourse = Course(req.body);

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
        Course.create(newCourse, (err, course) => {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                message: 'Course added successfully',
                data: course
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
        Course.update(req.params.id, Course(req.body), (err, course) => {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                message: 'Course updated successfully',
                data: course
            })
        })
    }
}

exports.delete = (req, res) => {
    Course.deleteById(req.params.id, (err, course) => {
        if (err) {
            res.send(err);
        }
        res.json({
            error: false,
            message: 'Course successfully deleted',
            data: course
        })
    })
}