const mongoose = require('mongoose');

const applyUserSchema = new mongoose.Schema({
    personalInformation: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dob: { type: Date, required: true },
        number: { type: String, required: true },
        address: { type: String, required: true },
        personalDesignation: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        aboutMe: { type: String, required: true },
        email: { type: String, required: true },
    },
    skills: [{
        skillName: { type: String, required: true },
        skillPercentage: { type: String, required: true }
    }],
    education: [{
        title: { type: String, required: true },
        degree: { type: String, required: true },
        institute: { type: String, required: true },
        year: { type: Date, required: true }
    }],
    experience: [{
        company: { type: String, required: true },
        designation: { type: String, required: true },
        jobForm: { type: String, required: true },
        endOn: { type: String, required: true },
        location: { type: String, required: true },
        aboutCompany: { type: String, required: true }
    }],
    portfolio: [{
        projectName: { type: String, required: true },
        portfolio_start_from: { type: Date, default: Date.now },
        portfolio_end_on: { type: Date, default: Date.now },
        projectDescription: { type: String, required: true },
        projectImage: { type: String }
    }],
    cv: { type: String } 
});

module.exports = mongoose.model("ApplyUser", applyUserSchema);
