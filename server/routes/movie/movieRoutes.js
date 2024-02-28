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

// get all movie data
router.get("/getallmovies", moviesController.getAllUserMovies);

//edit or update movie data
router.patch(
  "/update/:id",
  [userAuthenticate, movieUpload.single("image")],
  moviesController.updateMovie
);

//delete movie data
router.delete("/delete/:id", userAuthenticate, moviesController.deleteMovie);

// movie detail
router.get("/detail/:id", moviesController.getSingleMovie);

module.exports = router;
