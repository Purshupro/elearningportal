'use strict';

const mysql = require('mysql');

//local mysql db connection
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'aicte',
    password: '123456',
    database: 'aicte_activity'
})

dbConn.connect((error) => {
    if(error) throw error;
    console.log('Connected !');
})

module.exports = dbConn;