const express = require("express");
const {
  getAllProposals,
  ProposeNew,
} = require("../controllers/projPropController");

const router = express.Router();

//routes
router.post("/newproposal", ProposeNew);

router.post("/getproposals", getAllProposals);


module.exports = router;
