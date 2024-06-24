const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log('DB_CONNECTION_STRING:', process.env.DB_CONNECTION_STRING);
}).catch((error) => {
    console.log('Database connection error:', error);
});
