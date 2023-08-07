const mongoose = require("mongoose");

//schema design
const projpropSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    fullname: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    jury: {
      type: String,
      required: false,
    },
    edqfirstdegree: {
      type: String,
      required: false,
    },
    edqfirstyear: {
      type: String,
      required: false,
    },
    edqfirstsubject: {
      type: String,
      required: false,
    },
    edqfirstinstitution: {
      type: String,
      required: false,
    },
    edq2nddegree: {
      type: String,
      required: false,
    },
    edq2ndyear: {
      type: String,
      required: false,
    },
    edq2ndsubject: {
      type: String,
      required: false,
    },
    edq2ndinstitution: {
      type: String,
      required: false,
    },
    edq3rddegree: {
      type: String,
      required: false,
    },
    edq3rdyear: {
      type: String,
      required: false,
    },
    edq3rdsubject: {
      type: String,
      required: false,
    },
    edq3rdinstitution: {
      type: String,
      required: false,
    },
    edq4thdegree: {
      type: String,
      required: false,
    },
    edq4thyear: {
      type: String,
      required: false,
    },
    edq4thsubject: {
      type: String,
      required: false,
    },
    edq4thinstitution: {
      type: String,
      required: false,
    },
    orgAddress: {
      type: String,
      required: false,
    },
    orgName: {
        type: String,
        required: false,
      },
    orgCno: {
      type: String,
      required: false,
    },
    budget: {
      type: String,
      required: false,
    },
    budgetSummary: {
      type: String,
      required: false,
    },
    cno: {
      type: Number,
      required: false,
    },
    diffAbled: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    pStartDate: {
      type: Date,
      required: false,
    },
    pEndDate: {
      type: Date,
      required: false,
    },
    pSummary: {
      type: String,
      required: false,
    },
    ee1: {
      type: String,
      required: false,
    },
    ee2: {
      type: String,
      required: false,
    },
    ee3: {
      type: String,
      required: false,
    },
    ee4: {
      type: String,
      required: false,
    },
    ee5: {
      type: String,
      required: false,
    },
    ee6: {
      type: String,
      required: false,
    },
    ee7: {
      type: String,
      required: false,
    },
    ee8: {
      type: String,
      required: false,
    },
    ee9: {
      type: String,
      required: false,
    },
    ee10: {
      type: String,
      required: false,
    },
    pTitle: {
      type: String,
      required: [true, "Project Title is required"],
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

//export
const projpropModel = mongoose.model("projectproposals", projpropSchema);
module.exports = projpropModel;
