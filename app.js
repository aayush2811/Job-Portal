const express = require('express');
require('./db/connection');
const session = require('express-session');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const loginRegisterRouter = require('./routers/loginRegisterRouter');
const basicPageRouter = require('./routers/basicPageRouter');
const jobRouter = require('./routers/jobRouter');
const paymentRouter = require('./routers/paymentRouter');

const app = express();

app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use('/uploads', express.static("uploads"));

app.use('/', loginRegisterRouter);
app.use('/', basicPageRouter);
app.use('/', jobRouter);
app.use('/', paymentRouter);

app.set("view engine", "ejs");

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
