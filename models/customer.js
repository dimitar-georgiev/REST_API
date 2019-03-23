const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            default: '',
            maxlength: 255
        },
        first_name: {
            type: String,
            default: null,
            maxlength: 30
        },
        last_name: {
            type: String,
            default: null,
            maxlength: 50
        },
        ip: {
            type: String, //check the most appropriate value. Is it true Number - because of the dots?
            default: null,
            maxlength: 15
        },
        latitude: {
            type: String, //?????
            default: null
        },
        longitude: {
            type: String, //?????
            default: null
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Customer', customerSchema);