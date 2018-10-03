// Require path so we can find the index.html file
const path = require('path');

// module.exports exports this function so it can be required by another file (in this case, server.js)
// Must pass in app because it contains the Express application
module.exports = function(app) {
    // If no matching route is found default to index.html
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};