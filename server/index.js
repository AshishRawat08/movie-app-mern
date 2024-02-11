require("dotenv").config();
const express = require("express");
const app = express();
require("./db/connection");
const cors = require("cors");

const PORT = 4009;

app.use(cors());
// Prepare the server to understand JSON data sent by users (from frontend)
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "server has started" });
});

// user routes
const userAuthRoutes = require("./routes/user/userAuthRoutes");
app.use("/userauth/api", userAuthRoutes);


// movie routes
const moviesRoutes = require("./routes/movie/movieRoutes");
app.use("/movies/api", moviesRoutes);

// Listen port
app.listen(PORT, () => {
  console.log(`Server started on port number ${PORT}`);
});
