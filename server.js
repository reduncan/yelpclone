const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set the port to 3000 OR let the process set the port (if deployed to Heroku)
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// Connect to the Mongo DB using the inventorymaster database (will be created if it doesn't exist)
mongoose.connect('mongodb://yelpuser:yelp123@ds121753.mlab.com:21753/heroku_n8mmhx1p', { useNewUrlParser: true });

// Routes
// API Routes (require from routes file and pass in Express app)
require('./routes/api-routes')(app);
// HTML Routes (require from routes file and pass in Express app)
require('./routes/html-routes')(app);


// Start the server
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});