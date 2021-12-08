'use strict';

const Users = require('../models/users.model');

exports.findAll = (req, res) => {
    Users.findAll((err, users) => {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        console.log('res', users);
        res.status(200).send(users);
    });
};

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
        Users.create(newUser, (err, user, hasUser) => {
            if (err) {
                console.log(err);
                res.send(err.message);
            }
            if (hasUser) {
                res.status(409).json({
                    error: true,
                    message: 'User already exists',
                    data: user
                })
            } else {
                res.status(201).json({
                    error: false,
                    message: 'User registered successfully',
                    data: user
                })
            }
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
        Users.update(req.params.id, Users(req.body), (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                message: 'Users updated successfully',
                data: user
            })
        })
    }
}

exports.delete = (req, res) => {
    Users.deleteById(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({
            error: false,
            message: 'Users successfully deleted',
            data: user
        })
    })
}