const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    company_location: {
        type: String,
        required: true
    },
    company_email: {
        type: String,
        required: true
    },
    company_phone: {
        type: String,
        required: true
    },
    company_detail:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    company_logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    qualification_requirements: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Job', jobSchema);
