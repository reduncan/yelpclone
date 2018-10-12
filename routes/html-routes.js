const path = require('path');

module.exports = function(app) {
    //Sends homepage to client
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    //Sends page of search results to client
    app.get('/search', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/results.html'));
    });
    //Sends chosen business page to client
    app.get('/business', function(req, res) {
        
        res.sendFile(path.join(__dirname, '../public/business.html'));
    });
    //Sends review form to client
    app.get('/review', function(req, res) {
        console.log(req.query)
        res.sendFile(path.join(__dirname, '../public/review.html'));
    });
    //Sends update-review page
    app.get('/edit', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/edit-review.html'));
    });
    // If no matching route is found default to index.html
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};  
