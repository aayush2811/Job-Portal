require('dotenv').config();
const mongoose = require('mongoose');
const dbConnection =  () => {
    try {
         mongoose.connect(process.env.DB_CONNECTION_STRING, {
            
            // serverSelectionTimeoutMS: 5000 // Increase timeout settings
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit process with failure
    }
};

dbConnection();
