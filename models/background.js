const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BackgroundSchema = new Schema(
    {
      url: {
          type: String,
          trim: true
      }  
    }
);

const Background = mongoose.model("Background", BackgroundSchema);

module.exports = Background;