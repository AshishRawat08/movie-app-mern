const multer = require("multer");

//storage config
const storage = multer.diskStorage({
  // file destination
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  // giving file a name
  filename: (req, file, callback) => {
    const filename = `image-${Date.now()}.${file.originalname}`;
    callback(null, filename);
  },
});

//filter (type of image)
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, true);
    return callback(new Error("only png, jpg and jpeg formates are allowed "));
  }
};

const movieUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = movieUpload;
