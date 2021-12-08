const express = require('express');
const bodyParser = require('body-parser');// parse requests of content-type - application/x-www-form-urlencoded
const app = express();// create express app
const port = process.env.PORT || 5000;// Setup server port
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }))// parse requests of content-type - application/json
app.use(bodyParser.json())// define a root route
app.use(cors())

// listen for requests
app.get('/', (req, res) => {
    res.send();
});

//Require student route
const usersRoutes = require('./src/routes/users.route');
const activitiesRoute = require('./src/routes/activities.route');
const createUpcomingEventRoute = require('./src/routes/upcomingEvent.route');
const loginRoute = require('./src/routes/login.route');

//using as middleware
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/activities', activitiesRoute);
app.use('/api/v1/create-upcoming-event', createUpcomingEventRoute);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});