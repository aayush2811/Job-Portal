const express = require('express');
const router = express.Router();
const jobRouter = require('../controllers/jobController');
const authentication = require('../auth/authentication');

router.post('/job', jobRouter.addJob);
router.get('/job-details/:id', authentication.user , jobRouter.getJobDetails);
router.post('/applyuser', authentication.user ,jobRouter.applyuser);
router.post('/delete-user-post', jobRouter.deleteuserpost);

//approved job through send email
router.get('/approved/:email', jobRouter.approved);

module.exports = router;