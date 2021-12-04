'use strict';

const UpcomingEvent = require('../models/upcomingEvent.model');

exports.findAll = (req, res) => {
    UpcomingEvent.findAll((err, activities) => {
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
    const newActivity = UpcomingEvent(req.body);

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
        UpcomingEvent.create(newActivity, (err, activity) => {
            if (err) {
                res.send(err);
            }
            res.status(201).json({
                error: false,
                message: 'Event added successfully',
                data: activity
            })
        })
    }
}