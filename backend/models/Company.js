const mongoose = require('mongoose');

// Define Company schema and model
const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    industry: { type: String, required: true },
    investmentNeeded: { type: Number, required: true },
    funded: { type: Number, required: true },
    equityShare: { type: Number, required: true },
    debt: { type: Number, required: true },
    status: { type: String, required: true },
    fundingType: { type: String, required: true },
    foundedYear: { type: Number, required: true },
  });
  
  const Company = mongoose.model("Company", companySchema);

  module.exports = Company;
