const mongoose = require('mongoose');

let VendorProduct_Schema = new mongoose.Schema({
    email: {
        type: String
    },
    productname: {
        type: String
    },
    productprice: {
        type: Number
    },
    bundlequantity: {
        type: Number
    },
    orders: {
        type: Number
    },
    remaining:{
        type: Number
    },
    status:{
        type: String
    },
    rating:{
        type: Number
    }
});

module.exports = mongoose.model('VendorProduct', VendorProduct_Schema,'vendor_prod');