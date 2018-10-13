var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RestaurantSchema = new Schema(
    {

        id: {
            type: String,
            trim: true
        },
        alias: {
            type: String,
            trim: true
        },
        name: {
            type: String,
            trim: true
        },
        image_url: {
            type: String,
            trim: true
        },
        is_claimed: {
            type: Boolean,
            trim: true
        },
        is_closed: {
            type: Boolean,
            trim: true
        },
        url: {
            type: String,
            trim: true
        },
        price: {
            type: String,
            trim: true
        },
        rating: {
            type: Number,
            trim: true
        },
        review_count: {
            type: Number,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        photos: {
            type: Object,
        },
        hours: {
            type: Object,
        },
        categories: {
            type: Object,
        },
        coordinates: {
            type: Object,
        },

        location: {
            type: Object,
        },
        transactions: {
            type: String,
            trim: true
        },
        personal_review: {
            type: Object
        }
    }
);

var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;