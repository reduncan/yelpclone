// require("dotenv").config();
const db = require('../models');
// const yelp = require('yelp-fusion');
// const id =  process.env.YELP_SECRET;
// const client = yelp.client(id);

module.exports = function (app) {

// client.search({
//     term:'Four Barrel Coffee',
//     location: 'san francisco, ca'
//   }).then(response => {
//     console.log(response.jsonBody.businesses[0].name);
//   }).catch(e => {
//     console.log(e);
//   });

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