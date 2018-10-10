const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var BackgroundSchema = new Schema(
    {
      url: {
          type: String,
          trim: true
      }  
    }
);

const Backgrounds = mongoose.model("Background", BackgroundSchema);

module.exports = Background;