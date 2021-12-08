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

    dbConn.query(search_query, (err, res) => {
        if (err) {
            result(err, null, null);
            console.log('ERROR', err);
        }

        if (res.length == 0) {
            console.log("--------> User does not exist")
            result(null, user, 0);
        } else {
            const userPassword = newUser.password;
            const storedPassword = res[0].password;

            if (userPassword !== storedPassword) {
                result(null, user, 1);
            } else {
                console.log(res[0]);
                result(null, user)
            }
        }
    })
};

module.exports = User;