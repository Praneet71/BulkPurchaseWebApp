const mongoose = require('mongoose');

let ProductReview_Schema = new mongoose.Schema({
    vendor_email: {
        type: String
    },
    productname: {
        type: String
    },
    customer_email: {
        type: String
    },
    review:{
        type:String
    }
    
});

module.exports = mongoose.model('ProductReview', ProductReview_Schema,'prod_review');