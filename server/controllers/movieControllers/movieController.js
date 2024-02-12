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
