// generate random number 
function generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}



const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const nodemailer = require('nodemailer');

exports.register = (req, res) => {
    res.render("register");
};

exports.login = (req, res) => {
    res.render("login");
};

exports.registerPost = async (req, res) => {
    try {
        let { firstname, email, password, role } = req.body;
        if (req.body.role === "on") {
            role = "Recruiter";
        } else {
            role = "Job Seeker";
        }

        const token = jwt.sign({ email }, "tusharKothiya", { expiresIn: "1h" });
        const hashPassword = await bcrypt.hash(password, 10);
        const data = await new userModel({
            firstname,
            email,
            password: hashPassword,
            role,
            token,
        });

        data.token = token;
        await data.save();
        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
};

exports.loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(404).json({ message: "Incorrect password" });
        }

        req.session.user = user;
        if(user.role === 'Recruiter'){
            res.redirect('/payment');
        }else{
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.sendEmail = async (req, res) => {
    try {
        const email = req.body.email;
        let otp = generateRandomNumber();
        // Create a Nodemailer transporter using SMTP
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Your SMTP host
            port: 587, // Your SMTP port
            secure: false, // Set to true if using SSL
            auth: {
                user: "tusharkothiya710@gmail.com", // Your email address
                pass: "njfe wbwl vbnd kwkc", // Your email password or app password
            },
        });

        // Mail options
        let mailOptions = {
            from: 'tusharkothiya710@gmail.com', // Sender address
            to: email, // List of recipients
            subject: 'Password Recover', // Subject line
            text: 'Your OTP:- ' + otp + ' to reset your password'// Plain text body
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.send('Error occurred, email not sent.'); // Handle error
            } else {
                res.render('forget-password-2', {email: email , data: otp});
                console.log('Email sent: ' + info.response);
            }
        });


    } catch (error) {
        console.log(error);
    }
};

exports.forgetPass = (req,res) => {
    res.render('forget-password-2');
}

exports.forgetPassPost = async (req,res) => {
    try {
        const {otp , password , origionalOTP, email} = req.body;
        if(origionalOTP === otp){
            const haspPass = await bcrypt.hash(password,10)
            await userModel.findOneAndUpdate({email}, { $set: {password : haspPass} });
            res.redirect('/login');
        }else{
            res.status(404).json({message: 'provide correct otp'})
        }
    } catch (error) {
        console.log(error);
    }
}
