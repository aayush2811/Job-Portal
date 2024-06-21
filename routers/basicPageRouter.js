const express = require('express');
const router = express.Router()
const basicPageController = require('../controllers/basicPageController')
const authentication = require('../auth/authentication');


router.get('/', basicPageController.home);
router.get('/about',basicPageController.about)
router.get('/candidate-details', authentication.recruiter,basicPageController.candidatedetail);
router.get('/candidate-listing', authentication.recruiter,basicPageController.candidatelistning);
router.get('/categories',basicPageController.categories);
router.get('/company-details',basicPageController.companydetail);
router.get('/company-listing',basicPageController.companylistting);
router.get('/company-register', authentication.recruiter,basicPageController.companyregister);
router.get('/contact',basicPageController.contact);
router.get('/employer-login', authentication.recruiter,basicPageController.employerlogin);
router.get('/faq', authentication.user,basicPageController.faq);
router.get('/forgot-password', authentication.user, basicPageController.forgotpassword);
router.get('/job-details',basicPageController.jobdetails);
router.get('/job-listing', authentication.user ,basicPageController.joblisting);
router.get('/login',basicPageController.login);
router.get('/404',basicPageController.notfound);
router.get('/post-job',authentication.recruiter,basicPageController.postjob);
router.get('/pricing',basicPageController.pricing);
router.get('/profile', authentication.jobseeker ,basicPageController.profile);
router.get('/register',basicPageController.register);
router.get('/term-conditions',basicPageController.terms);

router.get('/dashbord', authentication.recruiter , basicPageController.dashbord);

module.exports = router


