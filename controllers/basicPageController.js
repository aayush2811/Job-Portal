const Job = require('../models/jobModel');
const applyUser = require('../models/applyUserModel');

exports.home = async (req,res) => {
    try {
        const job = await Job.find({});
        res.render('home', {job:job});
    } catch (error) {
        console.log(error);
    }
}

exports.about = (req,res)=>{
    res.render('about-us')
}
exports.candidatedetail = (req,res)=>{
    res.render('candidate-details')
}
exports.candidatelistning = (req,res)=>{
    res.render('candidate-listing')
}
exports.categories = async (req,res)=>{
    try {

        let search = req.query.search || "";
        let page = 1;

        if(req.query.page){
            page = req.query.page;
        }

        let limit = 4;

        //search logic

        const job = await Job.find({
            $or: [
                {designation:{$regex:search, $options: "i"}}
            ]
        }).limit( limit * 1)
        .skip((page-1)*limit)
        .exec();

        //pagination logic

        const count = await Job.find({
            $or: [
                {designation:{$regex:search, $options: "i"}}
            ]
        }).countDocuments();


        
        res.render('categories', {job:job , total: Math.ceil(count/limit)});
    } catch (error) {
        console.log(error);
    }
}
exports.companydetail = (req,res)=>{
    res.render('company-details')
}
exports.companylistting = (req,res)=>{
    res.render('company-listing')
}
exports.companyregister = (req,res)=>{
    res.render('company-register')
}
exports.contact = (req,res)=>{
    res.render('contact-us')
}
exports.employerlogin = (req,res)=>{
    res.render('employer-login')
}
exports.faq = (req,res)=>{
    res.render('faq')
}
exports.forgotpassword = (req,res)=>{
    res.render('forgot-password')
}
// exports.home = (req,res)=>{
//     res.render('home')
// }
exports.jobdetails = (req,res)=>{
    res.render('job-details')
}
exports.joblisting = (req,res)=>{
    res.render('job-listing')
}
exports.login = (req,res)=>{
    res.render('login')
}
exports.notfound = (req,res)=>{
    res.render('not-found')
}
exports.postjob = (req,res)=>{
    res.render('post-job')
   
}
exports.pricing = (req,res)=>{
    res.render('pricing')
}
exports.profile = (req,res)=>{
    res.render('profile')
}
exports.register = (req,res)=>{
    res.render('register')
}
exports.terms = (req,res)=>{
    res.render('term-conditions')
}


exports.dashbord = async (req,res) => {
    try {
        const user = await applyUser.find({});
        res.render('dashbord', {user});
    } catch (error) {
        
    }
}