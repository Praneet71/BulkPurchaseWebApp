const mongoose = require('mongoose');

let Customer_Schema = new mongoose.Schema({
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
    type:{
        type:String
    }
});

module.exports = mongoose.model('Customer', Customer_Schema,'customer_cred');