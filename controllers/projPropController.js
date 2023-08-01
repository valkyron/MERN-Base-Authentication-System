const proposalModel = require('../models/projPropModel')


const getAllProposals = async (req, res) => {
    try {
        const proposals = await proposalModel.find({
            userid: req.body.userid,
        });
        res.status(200).json(proposals);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const ProposeNew = async (req, res) => {
    try {
        const newproposal = new proposalModel(req.body);
        await newproposal.save()
        res.status(201).send('proposal created');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports= {getAllProposals, ProposeNew};