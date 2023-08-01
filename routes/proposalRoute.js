const express = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  UpdateProposal,
  getDraftProposal,
  getAllProposals,
  ProposeNew,
} = require("../controllers/projPropController");

const router = express.Router();

//routes
router.post("/newproposal", ProposeNew);

router.post("/getproposals", getAllProposals);

router.post("/getdraftproposals", getDraftProposal);

router.put('/updateproposal/:id', UpdateProposal);

// function authenticateToken(req, res, next) {
//   const username = req.body.username
//   const user = {name: username}
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]

//   if(token == null) return res.sendStatus(401)
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if(err) return res.sendStatus(403)
//     req.user = user
//     next()
//   })
// }

module.exports = router;
