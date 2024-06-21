function isUser(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function isRecruiter(req,res,next){
    if (req.session && req.session.user && req.session.user.role === "Recruiter") {
        next();
    } else {
        res.redirect('/404');
    }
}

function isJobSeeker(req,res,next){
    if (req.session && req.session.user && req.session.user.role === "Job Seeker") {
        next();
    } else {
        res.redirect('/404');
    }
}


module.exports = {user: isUser , recruiter: isRecruiter , jobseeker: isJobSeeker};