const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routers
//POST || LOGIN
router.post("/login", loginController);

//POST || LOGIN USER
router.post("/register", registerController);

//POST || LOGIN USER
// router.post("/projectproposal", loginController);


module.exports = router;
