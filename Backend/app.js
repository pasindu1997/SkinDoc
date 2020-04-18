const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://pasindu97:pasindu1997@cluster0-uheo1.mongodb.net/test?retryWrites=true&w=majority\n', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;

//Import routes
const userRoutes = require('./api/routes/users');
const imageRoutes = require('./api/routes/images');
const Clinics = require('./api/routes/clinics');
// const specific = require('./api/routes/clinics');

//middleware
app.use('/clinics', Clinics);
app.use('/clinics/:clinicEmail', Clinics);

//this will make the upload file public which means this folder is publicly available
app.use(express.static('uploads')); //hit http://localhost:3000/A%2016.jpg in browser
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//routes which should handle request
app.use('/users', userRoutes);
app.use('/images', imageRoutes);
app.use('/clinics', Clinics);


//if there is no requests route the below
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);


});
//if any kind of error throws(database errors) go to this
app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;