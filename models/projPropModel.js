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
    PIedQualif: {
      type: Array,
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
      type: Number,
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
