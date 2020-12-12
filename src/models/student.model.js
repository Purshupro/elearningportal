'use strict';

var dbConn = require('./../../config/db.config');

//student object creation

var Student = (student) => {
    return {
        reg_no: student.reg_no,
        student_name: student.student_name,
        course: student.course,
        email_id: student.email_id,
        phone_no: student.phone_no,
        address: student.address,
        date_of_joining: student.date_of_joining,
        parent: student.parent,
        hobbies: student.hobbies,
        previous_course: student.previous_course,
        previous_college: student.previous_college,
        remarks: student.remarks,
    }
};

Student.create = (newStudent, result) => {
    console.log('Actual Student', newStudent)
    dbConn.query("INSERT INTO student SET ?", newStudent, (err, res) => {
        if (err) {
            console.log('ERROR', err);
            result(err, null);
        } else {
            console.log(res.reg_no);
            result(null, res.reg_no);
        }
    })
};

Student.findByRegNo = (regNo, result) => {
    dbConn.query("SELECT * FROM student WHERE reg_no = ?", regNo, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}
Student.findAll = (result) => {
    dbConn.query("SELECT * FROM student", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            console.log("students:", res);
            result(null, res);
        }
    })
}

Student.deleteById = (id, result) => {
    dbConn.query("DELETE FROM student WHERE reg_no = ?", [id], (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Student.update = (id, student, result) => {
    dbConn.query("UPDATE student SET reg_no=?, student_name=?, course=?, email_id=?, phone_no=?, address=?, date_of_joining=?, parent=?, hobbies=?, previous_course=?, previous_college=?, remarks=? WHERE reg_no = ?",
        [
            student.reg_no,
            student.student_name,
            student.course,
            student.email_id,
            student.phone_no,
            student.address,
            student.date_of_joining,
            student.parent,
            student.hobbies,
            student.previous_course,
            student.previous_college,
            student.remarks,
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

module.exports = Student;