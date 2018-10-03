const db = require('../models/reviews');

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
    
    app.post('/api/review', function (req, res) {
        db.review.create(req.body)
            .then(function (dbReview) {
                res.json(dbReview);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    
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