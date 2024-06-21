const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jobPortalModified').then((res)=>{
    console.log('database');
}).catch((error) => console.log(error));