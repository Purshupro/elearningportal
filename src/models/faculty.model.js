'use strict';

var dbConn = require('./../../config/db.config');

//faculty object creation

var Faculty = (faculty) => {
    return {
        FAC_ID: faculty.FAC_ID,
        NAME: faculty.NAME,
        QUALIFICATION: faculty.QUALIFICATION,
        SPECIALZATION: faculty.SPECIALZATION,
        EXPRERIENCE: faculty.EXPRERIENCE,
        DEPARTMENT: faculty.DEPARTMENT,
        EMAIL_ID: faculty.EMAIL_ID,
        PHONE_NO: faculty.PHONE_NO,
        ADDRESS: faculty.ADDRESS
    }
};

Faculty.create = (newFaculty, result) => {
    console.log('Actual Faculty', newFaculty)
    dbConn.query("INSERT INTO faculty SET ?", newFaculty, (err, res) => {
        if (err) {
            console.log('ERROR', err);
            result(err, null);
        } else {
            console.log(res.FAC_ID);
            result(null, res.FAC_ID);
        }
    })
};

Faculty.findByRegNo = (facId, result) => {
    dbConn.query("SELECT * FROM faculty WHERE FAC_ID = ?", facId, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}
Faculty.findAll = (result) => {
    dbConn.query("SELECT * FROM faculty", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            console.log("students:", res);
            result(null, res);
        }
    })
}

Faculty.deleteById = (id, result) => {
    dbConn.query("DELETE FROM faculty WHERE FAC_ID = ?", [id], (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Faculty.update = (id, faculty, result) => {
    dbConn.query("UPDATE faculty SET FAC_ID=?, NAME=?, QUALIFICATION=?, SPECIALZATION=?, EXPRERIENCE=?, DEPARTMENT=?, EMAIL_ID=?, PHONE_NO=?, ADDRESs=? WHERE FAC_ID = ?",
        [
            faculty.FAC_ID,
            faculty.NAME,
            faculty.QUALIFICATION,
            faculty.SPECIALZATION,
            faculty.EXPRERIENCE,
            faculty.DEPARTMENT,
            faculty.EMAIL_ID,
            faculty.PHONE_NO,
            faculty.ADDRESS,
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

module.exports = Faculty;