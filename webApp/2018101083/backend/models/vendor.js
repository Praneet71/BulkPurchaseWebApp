const mongoose = require('mongoose');

let Vendor_Schema = new mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    ratingsum:{
        type: Number
    },
    count:{
        type: Number
    }
});

module.exports = mongoose.model('Vendor', Vendor_Schema,'vendor_cred');