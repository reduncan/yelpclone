// Require all models
const db = require('../models');

// module.exports exports this function so it can be required by another file (in this case, server.js)
// Must pass in app because it contains the Express application
module.exports = function (app) {

    app.get('/api/review', function (req, res) {
        db.review.find({})
            .then(function (dbReview) {
                res.json(dbReview);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    
    // Route for saving a new Inventory entry to the database via a POST request
    /* --- Code here --- */
    app.post('/api/review', function (req, res) {
        db.review.create(req.body)
            .then(function (dbReview) {
                res.json(dbReview);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    // Route for saving updates to inventory via a PUT request
    /* --- Code here --- */
    app.put('/api/review/:id', function (req, res) {
        db.review.findOneAndUpdate({ _id: req.params.id }, { $set: { 
            userName: req.body.userName, 
            dateOfReview: req.body.dateOfReview, 
            review: req.body.review,
            location: req.body.location,
            starRating: req.body.starRating  } })
            .then(function (dbReview) {
                res.json(dbReview);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};