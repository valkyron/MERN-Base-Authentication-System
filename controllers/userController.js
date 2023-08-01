const userModel = require("./../models/userModel");
const jwt = require('jsonwebtoken');

//Login Callback
const loginController = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password, role} = req.body;
    const user = await userModel.findOne({ email, password, role });
    if (!user) {
      console.log(req.body);
      res.status(404).send("User Not Found");
    }
    else {
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    console.log(req.body)
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
