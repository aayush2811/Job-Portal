const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "companyLogo") {
            cb(null, "uploads/companyLogo");
        } else if (file.fieldname === "companyDocuments") {
            cb(null, "uploads/companyDocuments");
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage: storage });

router.post('/company-register', upload.single('companyLogo'), companyController.addCompany);


module.exports = router;