'use strict';

var dbConn = require('../../config/db.config');

//activity object creation

var Activities = (activity) => {
    return {
        id: activity.id,
        event_name: activity.event_name,
        start_date: activity.start_date,
        end_date: activity.end_date,
        timings: activity.timings,
        no_of_participants: activity.no_of_participants,
        dept: activity.dept,
        mode: activity.mode,
        broucher: activity.broucher,
        event_type: activity.event_type
    }
};

Activities.create = (activity, result) => {
    console.log('Actual Activities', activity)
    dbConn.query("INSERT INTO activities SET ?", activity, (err, res) => {
        if (err) {
            console.log('ERROR', err);
            result(err, null);
        } else {
            console.log(res.id);
            result(null, res.id);
        }
    })
};

Activities.findByDate = (date, result) => {
    dbConn.query("SELECT * FROM activities WHERE start_date >= ?", date, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}   
Activities.findAll = (result) => {
    dbConn.query("SELECT * FROM activities", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            console.log("activity:", res);
            result(null, res);
        }
    })
}

Activities.deleteById = (id, result) => {
    dbConn.query("DELETE FROM activities WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Activities.update = (id, activity, result) => {
    dbConn.query("UPDATE activity SET event_name = ?, start_date = ?, end_date = ?, timings = ?, no_of_participants = ?, dept = ?, mode = ?, broucher = ?, event_type = ? WHERE id = ?",
        [
            activity.event_name,
            activity.start_date,
            activity.end_date,
            activity.timings,
            activity.no_of_participants,
            activity.dept,
            activity.mode,
            activity.broucher,
            activity.event_type,
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

module.exports = Activities;