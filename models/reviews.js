const mongoose = require('mongoose');

/* --- PHASE 1 - WRITE THE INVENTORY MODEL --- */

// Save a reference to the Schema constructor
/* --- Code here --- */
const Schema = mongoose.Schema;
// Using the Schema constructor, create a new UserSchema object
/* --- Code here --- */
const reviewSchema = new Schema ({
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: "Username is required"
    },

    dateOfReview: {
        type: String,
        trim: true,
        required: true
    },

    review: {
        type: String,
        trim: true,
        required: "Item Name is Required"
    },

    location: {
        type: String,
        trim: true,
        required: "Number of Items is Required"
    },

    starRating: {
        type: Number,
        trim: true,
        required: "Rating is required"
    }
})
// This creates our model from the above schema, using Mongoose's model method
/* --- Code here --- */
const review = mongoose.model("review", reviewSchema);
// Export the Inventory model
module.exports = review;
