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

    app.get('/api/background', function (req, res) {
        db.Background.find({})
            .then(function (dbBackground) {
                res.json(dbBackground)
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/background', function (req, res) {
        db.Background.create(req.body)
            .then(function (dbBackground) {
                res.json(dbBackground)
            })
            .catch(function (err) {
                res.json(err);
            });
    });

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
                // console.log(dbReview)
                // console.log('hello')
                // console.log(req.body.url)
                db.Restaurant.findOneAndUpdate({alias: req.body.url}, {$set: {personal_review: {
                    // personal_review_ID : dbReview._id,
                    personal_review_text : dbReview.text, 
                    personal_review_rating: dbReview.rating,
                    personal_review_time: dbReview.time_created, 
                }}})
                    //  { new: true}
                
            .then(function(dbUser){
                // console.log(dbUser)
                res.json(dbUser)
            }
            )
            .catch(function (err) {
                res.json(err);
            });
    });
})
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

    app.get('/api/review/:alias', function (req, res) {
        let alias = req.params.alias;
        console.log(alias)
        let regex = { $regex: new RegExp(alias, 'i')};
        db.Restaurant.find({'alias' : alias})
        .or([{'url' : regex}])
        .then(function (aliasReview) {
            console.log(aliasReview);
            res.json(aliasReview);
        })
        .catch(function (err) {
            res.json(err);
        });
    });
    app.get('/api/business/:alias', function (req, res) {
        db.Restaurant.find({alias:req.params.alias})
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
        // console.log("Search: " + searchTerm);
        // console.log("Location: " + location);
        console.log(`Searching keyword... ${searchTerm} near ${location}`);
        // searchBy.location();
        // searchBy.keywords(req.body.searchInput && req.body.locationInput, res);
        searchBy.keywordAndLocation(searchTerm, location, res);
    });
};