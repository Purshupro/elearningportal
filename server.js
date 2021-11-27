const express = require('express');
const bodyParser = require('body-parser');// parse requests of content-type - application/x-www-form-urlencoded
const app = express();// create express app
const port = process.env.PORT || 5000;// Setup server port

app.use(bodyParser.urlencoded({ extended: true }))// parse requests of content-type - application/json
app.use(bodyParser.json())// define a root route

// listen for requests
app.get('/', (req, res) => {
    res.send();
});

//Require student route
const facultyRoutes = require('./src/routes/faculty.routes');
const usersRoutes = require('./src/routes/users.routes');

//using as middleware
app.use('/api/v1/faculty', facultyRoutes);
app.use('/api/v1/users', usersRoutes);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});