'use strict';

var dbConn = require('./../../config/db.config');

//course object creation

var Course = (course) => {
    return {
        dept_name: course.dept_name,
        semester: course.semester,
        subject_code: course.subject_code,
        subject_name: course.subject_name,
        credits: course.credits,
        no_of_hours: course.no_of_hours,
        faculty_id: course.faculty_id,
    }
};

Course.create = (newCourse, result) => {
    console.log('Actual Course', newCourse)
    dbConn.query("INSERT INTO course SET ?", newCourse, (err, res) => {
        if (err) {
            console.log('ERROR', err);
            result(err, null);
        } else {
            console.log(res.subject_code);
            result(null, res.subject_code);
        }
    })
};

Course.findByRegNo = (facId, result) => {
    dbConn.query("SELECT * FROM course WHERE subject_code = ?", facId, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}
Course.findAll = (result) => {
    dbConn.query("SELECT * FROM course", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            console.log("course:", res);
            result(null, res);
        }
    })
}

Course.deleteById = (id, result) => {
    dbConn.query("DELETE FROM course WHERE subject_code = ?", [id], (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Course.update = (id, course, result) => {
    dbConn.query("UPDATE course SET dept_name=?, semester=?, subject_code=?, subject_name=?, credits=?, no_of_hours=?, faculty_id=? WHERE subject_code = ?",
        [
            course.dept_name,
            course.semester,
            course.subject_code,
            course.subject_name,
            course.credits,
            course.no_of_hours,
            course.faculty_id,
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

module.exports = Course;