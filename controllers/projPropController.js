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

const getDraftProposal = async (req, res) => {
    try {
        const proposals = await proposalModel.findOne({
            userid: req.body.userid,
            status: "Incomplete",
        });
        res.status(200).json(proposals);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const ProposeNew = async (req, res) => {
    try {
        console.log(req.body);
        const newproposal = new proposalModel(req.body);
        await newproposal.save()
        res.status(201).send('proposal created');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const UpdateProposal =  async (req, res) => {
    try {
        // Get the id parameter from the request URL
        const proposalId = req.params.id;
    
        // Extract the updated data from the request body
        const updatedData = req.body;
    
        // Find the existing document by its unique _id field
        const existingProposal = await proposalModel.findById(proposalId);
    
        if (!existingProposal) {
          return res.status(404).json({ message: 'Proposal not found' });
        }
    
        for (const key in updatedData) {
            // console.log(existingProposal[key], updatedData[key]);
            existingProposal[key] = updatedData[key];
          }
    
        // Save the updated document back to the database
        const updatedProposal = await existingProposal.save();
    
        // Respond with the updated document or a success message
        res.status(200).json(updatedProposal);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating proposal' });
      }
};

module.exports= {getAllProposals, ProposeNew, getDraftProposal, UpdateProposal};