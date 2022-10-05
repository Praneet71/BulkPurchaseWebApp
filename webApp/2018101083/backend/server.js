const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Customer = require('./models/customer');
let Vendor = require('./models/vendor');
let VendorProduct = require('./models/vendor_product');
let CustomerProduct = require('./models/customer_product');
let ReviewProduct = require('./models/product_review');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection1 = mongoose.connection;
connection1.once('open', function() {
    console.log("MongoDB database connection established succesfully to users.");
})

// mongoose.connect('mongodb://127.0.0.1:27017/consumers', { useNewUrlParser: true });
// const connection2 = mongoose.connection;
// connection2.once('open', function() {
//     console.log("MongoDB database connection established succesfully to consumers.");
// })

// mongoose.connect('mongodb://127.0.0.1:27017/vendors', { useNewUrlParser: true });
// const connection3 = mongoose.connection;
// connection3.once('open', function() {
//     console.log("MongoDB database connection established succesfully to vendors.");
// })

// API endpoints

// Getting all the users
userRoutes.route('/get_customers').get(function(req, res) {
    Customer.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/get_vendor_products').post(function(req, res) {
    // console.log(req.body.email);
    console.log(req.body);
    VendorProduct.find({'email':req.body.email,'status':'waiting'},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log('here1',products);
            res.json(products);
        }
    });
});

userRoutes.route('/get_customer_products').post(function(req, res) {
    // console.log(req.body.email);
    console.log(req.body);
    CustomerProduct.find({'email':req.body.email},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log('here10',products);
            res.json(products);
        }
    });
});

userRoutes.route('/get_vendor_products_ready_to_dispatch').post(function(req, res) {
    // console.log(req.body.email);
    console.log(req.body);
    VendorProduct.find({'email':req.body.email,'status':'placed'},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log('here8',products);
            res.json(products);
        }
    });
});

userRoutes.route('/get_vendor_products_dispatched').post(function(req, res) {
    // console.log(req.body.email);
    console.log(req.body);
    VendorProduct.find({'email':req.body.email,'status':'dispatched'},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log('here8',products);
            res.json(products);
        }
    });
});

userRoutes.route('/get_vendor_reviews').post(function(req, res) {
    // console.log(req.body.email);
    console.log("get_vendor_reviews ",req.body);
    ReviewProduct.find({'vendor_email':req.body.email},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log('here18',products);
            res.json(products);
        }
    });
});

userRoutes.route('/customer_order_search').post(function(req, res) {
    // console.log(req.body.email);
    console.log(req.body);
    VendorProduct.find({'productname':req.body.productname},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log('here4',products);
            res.json(products);
        }
    });
});

userRoutes.route('/customer_order_place').post(function(req, res) {
    // console.log(req.body.email);
    console.log(req.body);
    VendorProduct.findOne({'productname':req.body.productname,'email':req.body.email},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            let x=parseInt(products.orders);
            // if(x+parseInt(req.body.orderquantity)>products.bundlequantity)
            //     req.body.orderquantity=parseInt(products.bundlequantity)-x;
            
            let remaining=Math.max(parseInt(products.bundlequantity)-(x+parseInt(req.body.orderquantity)),0);   
            console.log("remaining :",remaining); 

            console.log("order-quantity server",x);
            if(x+parseInt(req.body.orderquantity)>=products.bundlequantity){
                VendorProduct.updateOne({'email':req.body.email,'productname':req.body.productname},{'orders':x+parseInt(req.body.orderquantity),'status':'placed','remaining':parseInt(remaining)},function(err,res){
            
            
                    if(err){
                        return console.log(err);
                    }
                    // console.log('here5',products);
                
                    // res.json(products);
            }
            )

            CustomerProduct.updateMany({'vendor':req.body.email,'productname':req.body.productname},{'status':'placed'},function(err,res){
            
            
                if(err){
                    return console.log(err);
                }
                // console.log('here5',products);
            
                // res.json(products);
        }
        )

        }
        else{
            VendorProduct.updateOne({'email':req.body.email,'productname':req.body.productname},{'orders':x+parseInt(req.body.orderquantity),'remaining':parseInt(remaining)},function(err,res){
        
        
                if(err){
                    return console.log(err);
                }
                // console.log('here5',products);
            
                // res.json(products);
        }
        )
    }

    console.log('here5',products);
                
    res.json(products);

    }

    })

    // UserProduct.findOne({'productname':req.body.productname,'email':req.body.email},function(err, products) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         let x=parseInt(products.orders);
    //         if(x+parseInt(req.body.orderquantity)>products.bundlequantity)
    //             req.body.orderquantity=parseInt(products.bundlequantity)-x;
    //         console.log("order-quantity server",x);
    //         if(x+parseInt(req.body.orderquantity)>=products.bundlequantity){
    //             VendorProduct.updateOne({'email':req.body.email,'productname':req.body.productname},{'orders':x+parseInt(req.body.orderquantity),'status':'placed'},function(err,res){
            
            
    //                 if(err){
    //                     return console.log(err);
    //                 }
    //                 // console.log('here5',products);
                
    //                 // res.json(products);
    //         }
    //         )
    //     }
    //     else{
    //         VendorProduct.updateOne({'email':req.body.email,'productname':req.body.productname},{'orders':x+parseInt(req.body.orderquantity)},function(err,res){
        
        
    //             if(err){
    //                 return console.log(err);
    //             }
    //             // console.log('here5',products);
            
    //             // res.json(products);
    //     }
    //     )
    // }

    // console.log('here5',products);
                
    // res.json(products);

    // }

    //     })    
        
    
    });

// userRoutes.route("/upproduct").post(function(req, res) {
//     console.log(req.body.email);
//     let x;
//     Vendor.findOne({ name: req.body.name, email: req.body.email }, function(
//       err,
//       person
//     ) {
//       if (err) return handleError(err);
//       x = person.size;
  
//       if (x - req.body.quan < 0) return res.status(404);
  
//       console.log("x value");
//       console.log(x);
//       Vendor.updateOne(
//         { email: req.body.email, name: req.body.name },
//         { size: x - req.body.quan },
//         function(err, res) {
//           if (err) {
//             console.log("invalid user");
//           }
//         }
//       );
//       return res.json(person);
//     });
//   });

userRoutes.route('/cancel_vendor_product').post(function(req, res) {
    // console.log(req.body.email);
    console.log(req.body);
    VendorProduct.deleteOne({'email':req.body.email,'productname': req.body.productname},function(err, product) {
        if (err) {
            console.log(err);
        } else {
            console.log('here2',product);
            res.json(product);
        }
    });
});

userRoutes.route('/cancel_customer_product').post(function(req, res) {
    console.log("cancel_customer_product");
    // console.log(req.body);
    CustomerProduct.find({'productname':req.body.productname,'vendor':req.body.email},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            // let x=parseInt(products.orders);
            // console.log("order-quantity server",x);
            CustomerProduct.updateMany({'vendor':req.body.email,'productname':req.body.productname},{'status':'cancelled'},function(err,res){
                if(err){
                    return console.log(err);
                }
            }
            )
            }
            console.log('here11',products);
            
            res.json(products);
        })
});

userRoutes.route('/update_vendor_rating').post(function(req, res) {
    console.log("update_vendor_rating");
    console.log(req.body);
    Vendor.findOne({'email':req.body.email},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            // let x=parseInt(products.orders);
            // console.log("order-quantity server",x);
            console.log(products);
            let rating_sum=parseInt(products.ratingsum);
            let count=parseInt(products.count);
            console.log(rating_sum);
            console.log(count);
            console.log(req.body.rating);
            const new_rating_sum=parseInt(rating_sum+parseInt(req.body.rating));
            const new_count=parseInt(count+1);
            console.log("new_rating_sum",new_rating_sum);
            console.log("new_count",new_count);
            // console.log(new_);
            const new_rating=new_rating_sum/new_count;
            console.log("new_rating",new_rating);
            Vendor.updateOne({'email':req.body.email},{$inc:{'ratingsum':req.body.rating,'count':1}},function(err,res){
                if(err){
                    return console.log(err);
                }
            }
            )

            VendorProduct.updateMany({'email':req.body.email},{'rating':new_rating},function(err,res){
                if(err){
                    return console.log(err);
                }
            }
            )

            }
            console.log('here11',products);
            
            res.json(products);
        })

        // VendorProduct.findOne({'email':req.body.email},function(err, products) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         // let x=parseInt(products.orders);
        //         // console.log("order-quantity server",x);
        //         console.log(products);
        //         // // let rating_sum=parseInt(products.ratingsum);
        //         // // let count=parseInt(products.count);
        //         // console.log(rating_sum);
        //         // console.log(count);
        //         // const new_rating_sum=parseInt(rating_sum+req.rating);
        //         // const new_count=parseInt(count+1);
        //         VendorProduct.updateOne({'email':req.body.email},{'ratingsum':req.body.rating,'count':1}},function(err,res){
        //             if(err){
        //                 return console.log(err);
        //             }
        //         }
        //         )
        //         }
        //         console.log('here11',products);
                
        //         res.json(products);
        //     })    


});

// userRoutes.route('/dispatch_vendor_product').post(function(req, res) {
//     // console.log(req.body.email);
//     console.log(req.body);
//     VendorProduct.deleteOne({'email':req.body.email,'productname': req.body.productname},function(err, product) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('here2',product);
//             res.json(product);
//         }
//     });
// });

userRoutes.route('/dispatch_vendor_product').post(function(req, res) {
    // console.log(req.body.email);
    console.log(req.body);
    VendorProduct.findOne({'productname':req.body.productname,'email':req.body.email,'status':'placed'},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            // let x=parseInt(products.orders);
            // console.log("order-quantity server",x);
            VendorProduct.updateOne({'email':req.body.email,'productname':req.body.productname,'status':'placed'},{'status':'dispatched'},function(err,res){
                if(err){
                    return console.log(err);
                }
            }
            )
            }
            console.log('here6',products);
            
            res.json(products);
        })
    
    });

userRoutes.route('/dispatch_customer_product').post(function(req, res) {
    // console.log(req.body.email);
    console.log("dispatch_customer_product");
    // console.log(req.body);
    CustomerProduct.find({'productname':req.body.productname,'vendor':req.body.email},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            // let x=parseInt(products.orders);
            // console.log("order-quantity server",x);
            CustomerProduct.updateMany({'vendor':req.body.email,'productname':req.body.productname},{'status':'dispatched'},function(err,res){
                if(err){
                    return console.log(err);
                }
            }
            )
            }
            console.log('here6',products);
            
            res.json(products);
        })
    
    });    

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

userRoutes.route('/register').post((req,res)=>{

    if(req.body.type==='customer'){
    // console.log(req.body.type);
    // console.log(req.body);
        let customer= new Customer(req.body);
        customer.save()
            .then(user=>{
                res.status(200).json({'User':'Customer added successfully'});
            })
            .catch(err=>{
                res.status(400).send('Error');
            });
    }
    else{
        let vendor= new Vendor(req.body);
        vendor.save()
            .then(user=>{
                res.status(200).json({'User':'Vendor added successfully'});
            })
            .catch(err=>{
                res.status(400).send('Error');
            });
    }

});

userRoutes.route('/customer_submit_review').post((req,res)=>{

    // if(req.body.type==='customer')
    // console.log(req.body.type);
    // console.log(req.body);
        let product_review= new ReviewProduct(req.body);
        product_review.save()
            .then(user=>{
                res.status(200).json({'User':'Review added successfully'});
            })
            .catch(err=>{
                res.status(400).send('Error');
            });

});

// userRoutes.route('/register_vendor').post((req,res)=>{
//     let vendor= new Vendor(req.body);
//     vendor.save()
//         .then(user=>{
//             res.status(200).json({'User':'Vendor added successfully'});
//         })
//         .catch(err=>{
//             res.status(400).send('Error');
//         });

// });

    userRoutes.route('/login').post((req,res)=>{
   

        Customer.findOne({'email': req.body.email,'password':req.body.password}, function(err, person){
            console.log('querying db')
            // console.log(person)
            if(err) return handleError(err);
            if(person){
                console.log('valid user');
                console.log(person);
                // localStorage.setItem("type",'customer');
                res.status(200).json(person);
            }
            else{

                Vendor.findOne({'email': req.body.email,'password':req.body.password}, function(err, person){
                    console.log('querying db')
                    // console.log(person)
                    if(err) return handleError(err);
                    if(person){
                        console.log('valid user');
                        console.log(person);
                        // localStorage.setItem("type",'vendor');
                        res.status(200).json(person);
                    }
                    else{        
                        console.log('user not found')
                        // res.set('Content-Type', 'json')
                        res.status(404).json({"Invalid":"Invalid Credentials"})
                    }
            }
        )
        }
    })

    //     Customer.find( {customer_email},
    //     function(err, users){
    //     if(err) {
    //     return next(err);
    //      } //else if(users) {
    //     //     console.log(users)
    //     // if (_.find(users , {email: user.email})){
    //     //     user.invalidate('email', 'email is already registered'); 
    //     //     next( new Error("email is already registered"));
    //     // }
    //     // else if (_.find(users , {username: user.username})){
    //     //     user.invalidate('username', 'username is already taken'); 
    //     //     next( new Error("username is already taken"));
    //     // }
    //     }
    //     else{
    //     // next();
    //     console.log(users);
    //     }   
    // })    

});

userRoutes.route('/create_vendor_product').post((req,res)=>{
    let vendor_product= new VendorProduct(req.body);
    vendor_product.save()
        .then(user=>{
            console.log(user);
            res.status(200).json(user);
        })
        .catch(err=>{
            res.status(400).send('Error');
        });

});

userRoutes.route('/create_customer_product').post((req,res)=>{
    let customer_product= new CustomerProduct(req.body);
    customer_product.save()
        .then(user=>{
            console.log(user);
            res.status(200).json(user);
        })
        .catch(err=>{
            res.status(400).send('Error');
        });

});

// userRoutes.route('/create_user_product').post((req,res)=>{
//     let customer_product= new CustomerProduct(req.body);
//     customer_product.save()
//         .then(user=>{
//             res.status(200).json({'User':'Product added successfully by customer user'});
//         })
//         .catch(err=>{
//             res.status(400).send('Error');
//         });

// });

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
