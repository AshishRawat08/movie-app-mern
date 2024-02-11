const mongoose = require("mongoose");

// movie schema
const movieSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    movieName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// model
const movieDB = new mongoose.model("movies", movieSchema);
module.exports = movieDB;
