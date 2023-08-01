require('dotenv').config()
const jwt = require('jsonwebtoken');

// sign jwt 
function signJWT(payload, expiresIn) {
    // console.log("sign karo chalo");
        return jwt.sign(payload, process.env.PRIVATE_KEY, { algorithm: "RS256", expiresIn: expiresIn
    });
}

// verify jwt 
function verifyJWT(token) {
    try {
        var decoded = jwt.verify(token, process.env.PUBLIC_KEY);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: error.message.include("jwt expired") };
    }
}

module.exports = {signJWT, verifyJWT};
