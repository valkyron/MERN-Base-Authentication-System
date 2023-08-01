const express = require("express");
const {
  loginController,
  registerController,
  logoutController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routers
//POST || LOGIN
router.post("/login", loginController);

// router.get("/login", sessionHandler);

//POST || LOGIN USER
router.post("/register", registerController);

//POST || LOGIN USER
router.post("/logout", logoutController);


module.exports = router;
