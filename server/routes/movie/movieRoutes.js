const express = require("express");
const userAuthenticate = require("../../middleware/userAuthenticate");
const router = new express.Router();
const movieUpload = require("../../multerConfig/movieStorageConfig");
const moviesController = require("../../controllers/movieControllers/movieController");

// movie routes
router.post(
  "/create",
  [userAuthenticate, movieUpload.single("image")],
  moviesController.createMovie
);

module.exports = router;
