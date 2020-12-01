const express = require('express');
const bodyParser = require('body-parser');// parse requests of content-type - application/x-www-form-urlencoded
const app = express();// create express app
const port = process.env.PORT || 5000;// Setup server port

app.use(bodyParser.urlencoded({ extended: true }))// parse requests of content-type - application/json
app.use(bodyParser.json())// define a root route

// listen for requests
app.get('/', (req, res) => {
    res.write('<html>');
    res.write('<head>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>');
    res.write('Hello');
    res.write('</h1>');
    res.write('</body>');
    res.write('</html>');
    res.send();
});

//Require student route
const studentRoutes = require('./src/routes/student.routes');

//using as middleware
app.use('/api/v1/student', studentRoutes);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});