require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true, // Ensure SSL is enabled
            tlsAllowInvalidCertificates: false, // Ensure no invalid certificates are allowed
            serverSelectionTimeoutMS: 5000, // Increase server selection timeout
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit process with failure
    }
};

dbConnection();

