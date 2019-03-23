const {validationResult} = require('express-validator/check');

const Customer = require('../models/customer');

exports.getCustomers = (req, res, next) => {

    const search = {};

    for(let key in req.query){
        search[key] = req.query[key];
    }

    Customer.find(search)
        .then(customers => {
            res.status(200).json({customers});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        });
};

exports.getCustomer = (req, res, next) => {
    const {customerId} = req.params;

    Customer.findById(customerId)
        .then(customer => {
            if (!customer) {
                const error = new Error('Couldn\'t find the customer.');
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({customer});
        })
        .catch(err => { //refactor to reusdable function
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        });
};

exports.addCustomer = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input data validation failed.');
        error.statusCode = 422;

        throw error;

    }
    
    const {email, first_name, last_name, ip, latitude, longitude} = req.body;
    
    const customer = new Customer({email, first_name, last_name, ip, latitude, longitude});
    customer.save()
        .then(result => {
            console.log('POST Result:', result);

            res.status(201).json(
                {
                    message: 'Customer created successfuly',
                    customer: result
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        });
};

exports.updateCustomer = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input data validation failed.');
        error.statusCode = 422;
        throw error;
    }
    
    const {customerId} = req.params;
    const {email, first_name, last_name, ip, latitude, longitude} = req.body;

    Customer.findById(customerId)
        .then(customer => {
            if (!customer) {
                const error = new Error('Couldn\'t find the customer.');
                error.statusCode = 404;
                throw error;
            }

            customer.email = email;
            customer.first_name = first_name;
            customer.last_name = last_name;
            customer.ip = ip;
            customer.latitude = latitude;
            customer.longitude = longitude;

            return customer.save();
        })
        .then(result => {
            res.status(200).json({customer: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        });
};

exports.deleteCustomer = (req, res, next) => {
    const {customerId} = req.params;

    Customer.findByIdAndRemove(customerId)
        .then(result => {
            res.status(200).json({customer: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        });
};