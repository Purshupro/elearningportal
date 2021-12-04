'use strict';

const Activities = require('../models/activities.model');

exports.findAll = (req, res) => {
    Activities.findAll((err, activities) => {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        console.log('res', activities);
        res.status(200).send(activities);
    });
};
exports.findOne = (req, res) => {
    Activities.findByDate((err, activities) => {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        console.log('res', activities);
        res.status(200).send(activities);
    });
};

exports.create = (req, res) => {
    console.log('Body', req.body);
    const newActivity = Activities(req.body);

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
        Activities.create(newActivity, (err, activity) => {
            if (err) {
                res.send(err);
            }
            res.status(201).json({
                error: false,
                message: 'User added successfully',
                data: activity
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
        Activities.update(req.params.id, Activities(req.body), (err, activity) => {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                message: 'Activities updated successfully',
                data: activity
            })
        })
    }
}

exports.delete = (req, res) => {
    Activities.deleteById(req.params.id, (err, activity) => {
        if (err) {
            res.send(err);
        }
        res.json({
            error: false,
            message: 'Activities successfully deleted',
            data: activity
        })
    })
}