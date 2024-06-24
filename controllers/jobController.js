const multer = require('multer');
const Job = require('../models/jobModel');
const UserInfo = require('../models/applyUserModel');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // Add this line to import mongoose


// Load environment variables from .env file
dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Upload files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename to ensure uniqueness
    }
});
const upload = multer({ storage: storage });

exports.addJob = (req, res) => {
    try {
        upload.single('company_logo')(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(400).send('Error uploading file');
            }
            try {
                const job = new Job({
                    designation: req.body.designation,
                    company_name: req.body.company_name,
                    company_location: req.body.company_location,
                    company_email: req.body.company_email,
                    company_phone: req.body.company_phone,
                    website: req.body.website,
                    company_detail: req.body.company_detail,
                    salary: req.body.salary,
                    company_logo: req.file.filename,
                    description: req.body.description,
                    qualification_requirements: req.body.qualification_requirements,
                    requirements: req.body.requirements
                });
                await job.save();
                res.send('Job posted successfully');
            } catch (error) {
                console.log(error);
                res.status(500).send('Internal Server Error');
            }
        });
    } catch (error) {
        console.log(error);;
    }
}

exports.getJobDetails = async (req, res) => {
    try {
        console.log("Request received for job details");

        const jobId = req.params.id;

        // Check if jobId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).send('Invalid job ID');
        }

        console.log("Valid job ID, proceeding to find job");
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).send('Job not found');
        }

        console.log("Job data:", job);
        res.render('job-details', { job: job });
        
    } catch (error) {
        console.error("Error occurred in getJobDetails:", error);
        res.status(500).send('Server error');
    }
};

exports.applyuser = async (req, res) => {
    try {
        upload.fields([{ name: 'portfolio_image' }, { name: 'cv' }])(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(400).send('Error uploading file');
            }
            try {
                const {
                    firstname,
                    lastname,
                    dob,
                    number,
                    address,
                    personal_designation,
                    age,
                    gender,
                    email,
                    about_me,
                    skill_name,
                    skill_percentage,
                    education_title,
                    education_degree,
                    education_institute,
                    education_year,
                    experience_company,
                    experience_designation,
                    job_form,
                    experience_end_on,
                    experience_location,
                    experience_about_company,
                    portfolio_project_name,
                    portfolio_start_from,
                    portfolio_end_on,
                    portfolio_project_description
                } = req.body;

                const projectImage = req.files['portfolio_image'][0].filename;
                const cv = req.files['cv'][0].filename;

                const userInfo = new UserInfo({
                    personalInformation: {
                        firstName: firstname,
                        lastName: lastname,
                        dob: new Date(dob),
                        number: number,
                        address: address,
                        personalDesignation: personal_designation,
                        age: age,
                        gender: gender,
                        aboutMe: about_me,
                        email: email
                    },
                    skills: [{
                        skillName: skill_name,
                        skillPercentage: skill_percentage
                    }],
                    education: [{
                        title: education_title,
                        degree: education_degree,
                        institute: education_institute,
                        year: new Date(education_year)
                    }],
                    experience: [{
                        company: experience_company,
                        designation: experience_designation,
                        jobForm: job_form,
                        endOn: experience_end_on,
                        location: experience_location,
                        aboutCompany: experience_about_company
                    }],
                    portfolio: [{
                        projectName: portfolio_project_name,
                        portfolio_start_from: portfolio_start_from,
                        portfolio_end_on: portfolio_end_on,
                        projectDescription: portfolio_project_description,
                        projectImage: projectImage
                    }],
                    cv: cv
                });

                await userInfo.save();
                res.status(200).send("Form submitted successfully!");

            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteuserpost = async (req, res) => {
    try {
        const { postID } = req.body;
        await UserInfo.findByIdAndDelete(postID);
        res.redirect('/dashbord');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

// Approve user post and send email using Nodemailer
exports.approved = async (req, res) => {
    try {
        const email = req.params.email;

        // Create a Nodemailer transporter using SMTP
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Your SMTP host
            port: 587, // Your SMTP port
            secure: false, // Set to true if using SSL
            auth: {
                user: process.env.EMAIL_APPROVER_USER, // Your email address
                pass: process.env.EMAIL_APPROVER_PASS // Your email password or app password
            }
        });

        // Mail options
        let mailOptions = {
            from: process.env.EMAIL_APPROVER_USER, // Sender address
            to: email, // List of recipients
            subject: 'Application Review', // Subject line
            text: 'Hey! ' + email + ' your application has been approved.' // Plain text body
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.send('Error occurred, email not sent.'); // Handle error
            } else {
                console.log('Email sent: ' + info.response);
                res.send('Application Approved'); // Send response
            }
        });

    } catch (error) {
        console.log(error);
    }
}
