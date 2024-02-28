const movieDB = require("../../models/movie/movieModel");
const cloudinary = require("../../cloudinary/cloudinaryConfig");

exports.createMovie = async (req, res) => {
  const file = req?.file ? req?.file?.path : "";
  const { movieName, publishYear } = req.body;

  if (!file || !movieName || !publishYear) {
    // res.status(400).json({ error: "All field require" });
    res.status(400).json({ error: "All fields are required" });
  } else {
    try {
      const upload = await cloudinary?.uploader?.upload(file);
      const existingMovie = await movieDB.findOne({ movieName: movieName });
      if (existingMovie) {
        res.status(400).json({ error: "Movie already exists" });
      } else {
        const moviesData = new movieDB({
          userID: req?.userMainId,
          movieName,
          image: upload?.secure_url,
          publishYear,
        });
        await moviesData.save();
        res.status(200).json({ msg: "Movie successfully created" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Internal error" });
    }
  }
};

// get all movies data
exports.getAllUserMovies = async (req, res) => {
  const page = req.query.page || 1;
  const ITEM_PER_PAGE = 2;
  const search = req.query.search || "";
  const sort = req.query.sort || "";

  const query = {
    movieName: { $regex: search, $options: "i" },
  };

  try {
    const skip = (page - 1) * ITEM_PER_PAGE;

    const allUserMovieCount = await movieDB.countDocuments(query);

    const allUserMovieData = await movieDB
      .find(query)
      .limit(ITEM_PER_PAGE)
      .skip(skip)
      .sort({ _id: sort == "new" ? -1 : 1 });

    const pageCount = Math.ceil(allUserMovieCount / ITEM_PER_PAGE);

    res.status(200).json({
      Pagination: { allUserMovieCount, pageCount },
      allUserMovieData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal error" });
  }
};

// upate or edit movie
exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const file = req?.file ? req?.file?.path : "";
  const { movieName, publishYear, image } = req.body;

  var upload;
  try {
    if (file) {
      upload = await cloudinary?.uploader?.upload(file);
    }

    let dynamicImg = file ? upload?.secure_url : image;
    const moviesUpdate = await movieDB.findByIdAndUpdate(
      { _id: id },
      {
        userID: req?.userMainId,
        movieName,
        image: dynamicImg,
        publishYear,
      },
      { new: true }
    );
    await moviesUpdate.save();
    res.status(200).json({ msg: "Movie successfully updated", moviesUpdate });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal error" });
  }
};

// delete movie
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteMovieData = await movieDB.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ msg: "movie successfully deleted", deleteMovieData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal error" });
  }
};

// get single movie data
exports.getSingleMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const getSingleMovieData = await movieDB.findOne({ _id: id });
    res.status(200).json(getSingleMovieData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal error" });
  }
};
