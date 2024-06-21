const express = require('express');
require('./db/connection');
const session = require('express-session');

const loginRegisterRouter = require('./routers/loginRegisterRouter');
const basicPageRouter = require('./routers/basicPageRouter');
const jobRouter = require('./routers/jobRouter');
const paymentRouter = require('./routers/paymentRouter');

const app = express();


app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'tusharKothiya',
    resave: false,
    saveUninitialized: false
}))
app.use('/uploads', express.static("uploads"));

app.use('/', loginRegisterRouter);
app.use('/', basicPageRouter);
app.use('/', jobRouter);
app.use('/', paymentRouter);

app.set("view engine", "ejs");


app.listen(8000, ()=>{
    console.log("http://localhost:8000");
})
