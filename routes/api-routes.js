// require("dotenv").config();
const db = require('../models/');
const searchBy = require('../public/js/search.js');
const test = require('../models/test.js');
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
        db.Review.find({})
            .then(function (dbReview) {
                res.json(dbReview);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/review', function (req, res) {
        db.Review.create(req.body)
            .then(function (dbReview) {
                res.json(dbReview);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.put('/api/review/:id', function (req, res) {
        db.Review.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    time_created: req.body.time_created,
                    text: req.body.text,
                    rating: req.body.rating
                }
            })
            .then(function (dbReview) {
                res.json(dbReview);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/restaurant', function (req, res) {
        db.Restaurant.find({})
            .then(function (dbRestaurant) {
                res.json(dbRestaurant);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
 
    app.get('/api/restaurant/:alias', function (req, res) {
        db.Restaurant.find({
                alias: req.params.alias
            })
            .then(function (dbRestaurant) {
                res.json(dbRestaurant);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/search', function (req, res) {
        console.log(`Searching keyword... ${req.body.searchInput} in ${req.body.locationInput}`);
        searchBy.keywords(req.body.searchInput && req.body.locationInput, res);
    });
};