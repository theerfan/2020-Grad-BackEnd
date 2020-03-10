import Koa from 'koa';

const app = new Koa();




const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const path = require('path');

const ApiException = require('./exceptions/api-exception');
const authorize = require('./middlewares/authorization');
const config = require('./config');

// importing routes
const indexRoute = require('./routes/index');
const oauthRoute = require('./routes/oauth');
const api94Route = require('./routes/user94-api');
const topsRoute = require('./routes/tops');
const profileRoute = require('./routes/pofile');
const studentsRoute = require('./routes/students');
const adminRoute = require('./routes/admin');

//setting up express
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/', indexRoute);
app.get('/health', (req, res) => {
    return res.json({"NOW": new Date()});
});
app.use('/oauth', oauthRoute);
app.use('/admin', adminRoute);
app.use('/students', studentsRoute);
app.use('/94', api94Route);
app.use('/tops', topsRoute);
app.use('/profile', profileRoute);
app.use('/static', authorize, express.static(path.join(__dirname, config.upload.multer.upload_dir)));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    if (err instanceof ApiException) {
        console.log(err.loggableError);
        return res.status(err.statusCode).json(err.jsonBody);
    } else if (err.status === 404) {
        return res.status(err.status).json({ error: "NOT FOUND" });
    } else {
        console.error(err);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
});

module.exports = app;
