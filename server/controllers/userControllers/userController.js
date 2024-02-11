const userDB = require("../../models/user/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const SECRET_KEY = "ashishashishashishashishashishashish";

// register/signup function logic
exports.register = async (req, res) => {
  //   console.log("req.body", req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ error: "all field are required to fill" });
  } else {
    try {
      const existingUser = await userDB.findOne({ email: email });
      if (existingUser) {
        res.status(400).json({ error: "This user is already exist" });
      } else {
        const userData = new userDB({
          username,
          email,
          password,
        });

        //password hashing process take place in usermodel
        await userData.save();
        res.status(200).json({ msg: "user successfully register" });
      }
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
};

// login function logic
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "all field are required to fill" });
  } else {
    try {
      const userValid = await userDB.findOne({ email: email });
      if (userValid) {
        const isPasswordMatch = await bcrypt.compare(
          password,
          userValid.password
        );
        if (!isPasswordMatch) {
          res.status(400).json({ msg: "invalid details" });
        } else {
          // token generating process
          const token = JWT.sign({ _id: userValid._id }, SECRET_KEY, {
            expiresIn: "1d",
          });
          userValid.tokens = { token };
          await userValid.save();

          res.status(200).json({ msg: "user successfully logged in", token });
        }
      } else {
        res.status(400).json({ msg: "user not exist or invalid details" });
      }
    } catch (error) {
      res.status(400).json({ error: "inernal error" });
    }
  }
};
