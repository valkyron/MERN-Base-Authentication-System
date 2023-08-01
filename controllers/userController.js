const { createSession } = require("../models/sessionModel");
const { signJWT, verifyJWT } = require("../utils/jwt.utils");
const userModel = require("./../models/userModel");

// ACCESS_TOKEN_SECRET = 91c195d1348dac17ca3dc13dc3bc9c00d33b475d6e0243dcb8a3b4917de404f1d5bd02c10383aafa800fa0c817fae602525bd900d1ff68fd78d8e86537aba694
// REFRESH_TOKEN_SECRET = 41f68eff305f5d86a85445aeef7c5b9d2ebeed44bb97aad28c869378108b138316c5e5514b73f4c053597809545175df2f585b1a19c9adae1eb7d44386efcf07


//Login Callback
const loginController = async (req, res) => {
  try {
    const { email, password, role, username} = req.body;
    const user = await userModel.findOne({ email, password, role });
    if (!user) {
      console.log(req.body);
      res.status(404).send("User Not Found");
    }
    else {
      const session = createSession(email, user.name)

      const accessToken = signJWT({email: user.email, name: user.name, sessionID: session.sessionId}, '5s');
      const refreshToken = signJWT({sessionID: session.sessionId}, '10s');
      // console.log("mil gaya accessToken");
      // console.log(accessToken);

      res.cookie("accessToken", accessToken, {
        maxAge: 5000, //5mins, 300000
        httpOnly: true,
      })
      res.cookie("refreshToken", refreshToken, {
        maxAge: 10000, //1h, 3.6e+6
        httpOnly: true,
      })
    
      // console.log("chalo verify karo");
      const payload = verifyJWT(accessToken).payload;
      // console.log(payload);
      res.json({session, user});
    }
  } catch (error) {
    console.log(req.body);
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

  const logoutController = async (req, res) => {
    res.cookie("accessToken", "", {
      maxAge: 0,
      httpOnly: true,
    })
  
    // const navigate = useNavigate();
    // localStorage.removeItem("user");
    // message.success("Logged out successfully");
    res.status(200).json({ message: "Logged out successfully" });

  };

module.exports = { loginController, registerController, logoutController};
