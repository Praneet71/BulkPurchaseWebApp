const mongoose = require('mongoose');

let CustomerProduct_Schema = new mongoose.Schema({
    email: {
        type: String
    },
    productname: {
        type: String
    },
    vendor: {
        type: String
    },
    quantity: {
        type: Number
    },
    status:{
        type: String
    }
});

module.exports = mongoose.model('CustomerProduct', CustomerProduct_Schema,'customer_prod');