const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dzcsqcwm4",
  api_key: "647317762828231",
  api_secret: "uRtLPR5uRt4rJ7JjGqek0WfSiAQ",
//   api_environment_variable:
//     "CLOUDINARY_URL=cloudinary://647317762828231:uRtLPR5uRt4rJ7JjGqek0WfSiAQ@dzcsqcwm4",
});

module.exports = cloudinary;
