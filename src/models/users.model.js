'use strict';

var dbConn = require('./../../config/db.config');

//user object creation

var User = (user) => {
    return {
        user_id: user.user_id,
        password: user.password,
    }
};

User.create = (newUser, result) => {
    console.log('Actual User', newUser)
    dbConn.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log('ERROR', err);
            result(err, null);
        } else {
            console.log(res.user_id);
            result(null, res.user_id);
        }
    })
};

User.findByUserId = (user_id, result) => {
    dbConn.query("SELECT * FROM users WHERE user_id = ?", user_id, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}
User.findAll = (result) => {
    dbConn.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            console.log("user:", res);
            result(null, res);
        }
    })
}

User.deleteById = (id, result) => {
    dbConn.query("DELETE FROM users WHERE user_id = ?", [id], (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

User.update = (id, user, result) => {
    dbConn.query("UPDATE user SET user_id=?, password=? WHERE user_id = ?",
        [
            user.user_id,
            user.password,
            id
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        })
}

module.exports = User;