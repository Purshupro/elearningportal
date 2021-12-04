'use strict';

var dbConn = require('../../config/db.config');

//activity object creation

var UpcomingEvent = (activity) => {
    return {
        event_name: activity.event_name,
        event_details: activity.event_details
    }
};

UpcomingEvent.create = (activity, result) => {
    console.log('Actual UpcomingEvent', activity)
    dbConn.query("INSERT INTO upcoming_events SET ?", activity, (err, res) => {
        if (err) {
            console.log('ERROR', err);
            result(err, null);
        } else {
            console.log(res.id);
            result(null, res.id);
        }
    })
};

UpcomingEvent.findByDate = (date, result) => {
    dbConn.query("SELECT * FROM upcoming_events WHERE start_date >= ?", date, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}   
UpcomingEvent.findAll = (result) => {
    dbConn.query("SELECT * FROM upcoming_events", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            console.log("activity:", res);
            result(null, res);
        }
    })
}

module.exports = UpcomingEvent;