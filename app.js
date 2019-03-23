const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const customerRoutes = require('./routes/customers');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.use('/customers', customerRoutes);

app.use((err, req, res, next) => {
    console.log('Error from app.js: ', err);

    const statusCode = err.statusCode || 500;
    const message = err.message;

    res.status(statusCode).json({message});
});

mongoose.connect('mongodb+srv://allegiant:secret777@test-cloud-mongo-cluster-qyf1y.mongodb.net/people?retryWrites=true', {useNewUrlParser: true})
    .then(result => app.listen(3000, () => console.log('Server running on port 3000')))
    .catch(err => console.log(err));