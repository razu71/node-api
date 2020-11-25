const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');

mongoose.connect("mongodb://localhost/" + process.env.DB_NAME , { useNewUrlParser: true, useCreateIndex: true })

var db = mongoose.connection;
db.on('error', console.error.bind(console,'DB Connection Error'));
db.once('open', function() {
  console.log("Database Connected Successfully!");
});

app.use(morgan('dev'));
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRoute);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;