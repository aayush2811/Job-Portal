const Company = require('../models/companyRegister');

exports.addCompany = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);
    console.log("Uploaded Files:", req.files);

    const { companyName, companyTag, companyOwner, companyLocation, companyEmail, companyPhone, website, companyDetail, companyAddres } = req.body;
    const companyLogo = req.file ? req.file.filename : '';
    // const companyDocuments = req.files ? req.files.map(file => file.filename) : [];

    console.log("Parsed Data:", {
      companyName,
      companyTag,
      companyOwner,
      companyLocation,
      companyEmail,
      companyPhone,
      website,
      companyDetail,
      companyLogo,
      companyAddres,
    //   companyDocuments
    });

    const newCompany = new Company({
      companyName,
      companyTag,
      companyOwner,
      companyLocation,
      companyEmail,
      companyPhone,
      website,
      companyDetail,
      companyLogo,
      companyAddres,
    //   companyDocuments
    });

    console.log("Saving Company:", newCompany);

    await newCompany.save();
    console.log('Company registered successfully');
    res.send('Company registered successfully');
  } catch (error) {
    console.error('Error in addCompany:', error);
    res.status(500).send('Internal Server Error');
  }
};

