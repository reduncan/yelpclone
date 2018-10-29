var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ReviewSchema = new Schema(
    {
        id: {
            type: String,
            trim: true
        },
        rating: {
            type: Number,
            trim: true
        },
        user: {
            type: Object,
            trim: true
        },
        text: {
            type: String,
            trim: true
        },
        time_created: {
            type: String,
            trim: true
        },
        url: {
            type: String,
            trim: true
        },
        already_reviewed:{
            type: Boolean,
            // required: true,
            unique: false
        }
    }
)

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;