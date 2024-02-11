const express = require("express");
const router = new express.Router();
const userAuthController = require("../../controllers/userControllers/userController");

//user auth routes

// register/signup route
router.post("/register", userAuthController.register);
router.post("/login", userAuthController.login);

module.exports = router;
