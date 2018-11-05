const db = require('../models/');
const searchBy = require('../public/js/search.js');
const axios = require('axios');
require("dotenv").config();
const RestfulAPI = require('./RestClass');

module.exports = function (app) {

    const background = new RestfulAPI('background', app, db.Background);
    background.find();
    background.create();

    const restaurant = new RestfulAPI('restaurant', app, db.Restaurant);
    restaurant.find();

    const review = new RestfulAPI('review', app, db.Review);
    review.find();

    app.post('/api/review', function (req, res) {

        db.Review.create(req.body)
            .then(function (dbReview) {
                db.Restaurant.findOneAndUpdate({
                        alias: req.body.url
                    }, {
                        $set: {
                            personal_review: {
                                personal_review_text: dbReview.text,
                                personal_review_rating: dbReview.rating,
                                personal_review_time: dbReview.time_created,
                                already_reviewed: dbReview.already_reviewed
                            }
                        }
                    })
                    .then(function (dbUser) {
                        res.json(dbUser)
                    })
                    .catch(function (err) {
                        res.json(err);
                    });
            });
    })

    app.put('/api/update/:id', function (req, res) {
        db.Restaurant.findOneAndUpdate({
                alias: req.params.id
            }, {
                $set: {
                    personal_review: req.body
                }
            })
            .then(function (dbUser) {
                res.json(dbUser)
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

    app.get('/api/review/:alias', function (req, res) {
        let alias = req.params.alias;
        let regex = {
            $regex: new RegExp(alias, 'i')
        };
        db.Restaurant.find({
                'alias': alias
            })
            .or([{
                'url': regex
            }])
            .then(function (aliasReview) {
                res.json(aliasReview);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/business/:alias', function (req, res) {
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
        let searchTerm = req.body.searchInput;
        let location = req.body.locationInput;
        searchBy.keywordAndLocation(searchTerm, location, res);
    });

    app.get('/api/geocode/:location', function (req, res) {
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: req.params.location,
                    key: process.env.GEOCODE_KEY
                }
            })
            .then(function (result) {
                res.json(result.data);
            })
            .catch(function (err) {
                res.json(err);
            })
    });
}