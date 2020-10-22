let express = require('express')
let apiRoutes = require("./routes/contact")
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// Initialize the app
let app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
     extended: true
 }));
app.use(bodyParser.json());

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
console.log('Current environment: ', env);
// Connect to Mongoose and set connection variable
if (env === 'development') {
    mongoose.connect('mongodb://localhost/taskb', { useNewUrlParser: true, useUnifiedTopology: true});
} else if (env === 'test') {
    mongoose.connect('mongodb://localhost/taskb_test', { useNewUrlParser: true, useUnifiedTopology: true});
} else if (env === 'production') {
    // To add
}
var db = mongoose.connection;

// Check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// when a random route is inputed
app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the CS3219 Task B API.'
 }));

// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
const server = app.listen(port, function () {
     console.log("Running on port " + port);
});

// Export for testing
module.exports = server;