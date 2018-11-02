const searchBy = require('../public/js/search.js');
const axios = require('axios');
require("dotenv").config();
const RestfulAPI = require('./RestClass');
const db = require('../models');

module.exports = function (app) {

    const background = new RestfulAPI('background', app, db.Background);
    background.find();
    background.create();

    const restaurant = new RestfulAPI('restaurant', app, db.Restaurant);
    restaurant.find();
    restaurant.find('alias');
    restaurant.findOneAndUpdate('id');

    const review = new RestfulAPI('review', app, db.Review);
    review.find();

    const reviewRestaurant = new RestfulAPI('review', app, db.Restaurant);
    reviewRestaurant.findRestaurant('alias');

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