const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

const review = mongoose.model("review", reviewSchema);

module.exports = review;
