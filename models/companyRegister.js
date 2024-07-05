const mongoose = require('mongoose');

const companyRegisterSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    companyTag: { type: String, required: true },
    companyOwner: { type: String, required: true },
    companyLocation: { type: String, required: true },
    companyEmail: { type: String, required: true },
    companyPhone: { type: Number, required: true },
    website: { type: String, required: true },
    companyDetail: { type: String, required: true },
    companyLogo: { type: String, required: true },
    companyAddres: { type: String, required: true },
    // companyDocuments: { type: [String], required: true }
});

const Company = mongoose.model('Company', companyRegisterSchema);

module.exports = Company;
