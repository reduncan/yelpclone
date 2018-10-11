const db = require("../../models");

const keywords = function (keywords, res) {
    let regex = { $regex: new RegExp(keywords, 'i')}
    db.Restaurant
    .find()
    .or([
            { 'location.city' : regex },
            { 'alias': regex },
            { 'categories.alias': regex },
            { 'categories.title': regex },
            { 'location.address1' : regex },    
            { 'location.address2' : regex },
            { 'location.address3' : regex },
            { 'location.zip_code' : regex },
            { 'location.country' : regex },
            { 'location.state' : regex },
    ])
    .then(function(businesses) {res.json(businesses);})
    .catch(function(err) {res.json(err);});

}

// potential future add-on
const what3words = function (words, options) {}

const by = {
    keywords : keywords,
    what3words: what3words // for future implementations
}

module.exports = by;