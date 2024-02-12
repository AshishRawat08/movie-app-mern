const userDB = require("../models/user/userModel");
const JWT = require("jsonwebtoken");
const SECRET_KEY = "ashishashishashishashishashishashish";

const userAuthenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    //verifying user
    const verifyToken = JWT.verify(token, SECRET_KEY);
    const rootUser = await userDB.findOne({ _id: verifyToken._id });
    if (!rootUser) {
      throw new Error("user not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    req.userMainId = rootUser.id;
    next();

    // console.log("rootUser", rootUser);
  } catch (error) {
    res.status(400).json({ error: "Unauthorized no token provided" });
  }
};
module.exports = userAuthenticate;
