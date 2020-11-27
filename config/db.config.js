'use strict';

const mysql = require('mysql');

//local mysql db connection
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'college'
})

dbConn.connect((error) => {
    if(error) throw error;
    console.log('Connected !');
})

module.exports = dbConn;