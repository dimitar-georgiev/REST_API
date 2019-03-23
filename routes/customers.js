const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');

const customersController = require('../controllers/customers');

router.get('/', customersController.getCustomers);

router.get('/:customerId', customersController.getCustomer);

router.post('/',
    [
        //add validation for all fields
        body("first_name").trim().isLength({min: 3}),
        body('last_name').trim().isLength({min: 3})
    ], customersController.addCustomer);

router.put('/:customerId', 
    [
        //add validation for all fields
        body("first_name").trim().isLength({min: 3}),
        body('last_name').trim().isLength({min: 3})
    ], customersController.updateCustomer);

router.delete('/:customerId', customersController.deleteCustomer);

module.exports = router;