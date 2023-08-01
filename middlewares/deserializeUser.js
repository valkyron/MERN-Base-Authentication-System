const { getSession } = require("../models/sessionModel");
const { verifyJWT, signJWT } = require("../utils/jwt.utils");

function deserializeUser(req, res, next) {
    console.log("deserializeUser called");
    if(!req?.cookies)
        return next();

    var {accessToken, refreshToken} = req.cookies;
    if (!accessToken) {
        return next();
    }

    var {payload, expired} = verifyJWT(accessToken).payload;

    //for a valid access token
    if (payload) {
        // @ts-ignore 
        req.user = payload;
        return next();
    }

    //expired but valid access token
    const {payload: refresh} = expired && refreshToken ? verifyJWT(refreshToken) : {payload: null}
    console.log(payload);
    if(!refresh) {
        return next();
    }

    // @ts-ignore
    const session = getSession(refresh.sessionId);
    console.log("getitttt2");
    if(!session) {
        return next();
    }

    console.log("getitttt");
    const newAccessToken = signJWT(session, '2m');
    res.cookie("accessToken", newAccessToken, {
        maxAge: 5000, //5mins, 300000
        httpOnly: true,
    });

    req.user = verifyJWT(newAccessToken).payload;

    return next();
}

module.exports = deserializeUser;