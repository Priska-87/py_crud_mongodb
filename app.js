const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const {dbConnection} = require('./db/db')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "Aquí iría una contraseña",
    resave: true,
    saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/api', apiRouter);
dbConnection()

module.exports = app;
