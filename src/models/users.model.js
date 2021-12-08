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
    const user = newUser.user_id;
    const sqlSearch = "SELECT * FROM users WHERE user_id = ?"
    const search_query = dbConn.format(sqlSearch, [user]);

    const sqlInsert = "INSERT INTO users VALUES (0,?,?)"
    const insert_query = dbConn.format(sqlInsert, [user, newUser.password]);

    dbConn.query(search_query, (err, res) => {
        if (err) {
            result(err, null, null);
            console.log('ERROR', err);
        }

        if (res.length != 0) {
            console.log('----> User already exists');
            result(null, user, true);
        } else {
            dbConn.query(insert_query, (err, res) => {
                if (err) throw (err)
                console.log("--------> Created new User")
                result(null, res.user_id, null);
            })
        }
    })
    // dbConn.query("INSERT INTO users SET ?", newUser, (err, res) => {
    //     if (err) {
    //         console.log('ERROR', err);
    //         result(err, null);
    //     } else {
    //         console.log(res.user_id);
    //         result(null, res.user_id);
    //     }
    // })
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