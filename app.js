const express = require('express');
require('./db/connection'); // Ensure the database connection is established
const session = require('express-session');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')

dotenv.config();

const loginRegisterRouter = require('./routers/loginRegisterRouter');
const basicPageRouter = require('./routers/basicPageRouter');
const jobRouter = require('./routers/jobRouter');
const paymentRouter = require('./routers/paymentRouter');
const auth = require('./middleware/auth');
const CompanyRegister = require('./routers/companyRouter');
const app = express();

app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION_STRING }),
}));
app.use('/uploads', express.static("uploads"));
app.use(auth);
app.use('/', loginRegisterRouter);
app.use('/', basicPageRouter);
app.use('/', jobRouter);
app.use('/', paymentRouter);
app.use('/', CompanyRegister);

app.set("view engine", "ejs");

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
