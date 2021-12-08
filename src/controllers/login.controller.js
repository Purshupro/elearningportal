'use strict';

const Users = require('../models/login.model');

exports.create = (req, res) => {
    console.log('Body', req.body);
    const newUser = Users(req.body);

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
        Users.create(newUser, (err, user, errorCode) => {
            if (err) {
                console.log(err);
                res.send(err.message);
            }
            if (errorCode === 0) {
                res.status(404).json({
                    error: true,
                    message: 'User does not exists',
                    data: user
                })
            } else if (errorCode === 1) {
                res.status(404).json({
                    error: true,
                    message: 'Invalid Credentials, Please try again',
                    data: user
                })
            } else {
                res.json({
                    error: false,
                    message: 'User has successfully logged in',
                    data: user
                })
            }
        })
    }
}