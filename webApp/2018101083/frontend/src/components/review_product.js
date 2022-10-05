import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class VendorReadyDispatch extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            // productname:'',
            // productprice:'',
            // bundlequantity:'',
            products:[],
            review:'',
            productname:'',
            vendorname:'',
            customername:'',
        };

        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        this.onLogout=this.onLogout.bind(this);
        // this.onSignup=this.onSignup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.onChangeProductName=this.onChangeProductName.bind(this);
        // this.onChangeProductPrice=this.onChangeProductPrice.bind(this);
        // this.onChangeBundleQuantity=this.onChangeBundleQuantity.bind(this);
        // this.onDispatchProduct=this.onDispatchProduct.bind(this);
        this.onChangeProductName=this.onChangeProductName.bind(this);
        this.onChangeVendorName=this.onChangeVendorName.bind(this);
        this.onChangeCustomerName=this.onChangeCustomerName.bind(this);
        this.onChangeReview=this.onChangeReview.bind(this);
        this.onClickBack=this.onClickBack.bind(this);
    }

        componentDidMount() {
        // const localuser=localStorage.getItem("username");
        // console.log(localuser);
        // const newProduct={email:localuser}
        // axios.post('http://localhost:4000/get_vendor_products_dispatched',newProduct)
        // .then(response => {
        //     this.setState({products: response.data});
        //     console.log(response);
        // })
        // .catch(function(error) {
        //     console.log(error);
        // })  
    }

    onSubmit(e) {
        e.preventDefault();

        // const newProduct = {
        //     productname:this.state.productname,
        //     searchresults:[],
        //     review:this.state.review
        // }

        // console.log("yo1");

        // axios.post('http://localhost:4000/get',newProduct)
        // .then(response => {
        //     this.setState({searchresults: response.data});
        //     console.log(response);
        // })
        // .catch(function(error) {
        //     console.log(error);
        // }) 

        const newReview={
            productname:localStorage.getItem("currentproduct"),
            vendor_email:localStorage.getItem("currentvendor"),
            customer_email:localStorage.getItem("username"),
            review:this.state.review
        }

        axios.post('http://localhost:4000/customer_submit_review',newReview)
        .then(response => {
            // this.setState({searchresults:response.data});
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        }) 

        this.setState({
            productname:'',
            customername:'',
            vendorname:'',
            searchresults:[],
            review:''
        });

        this.props.history.push("/view_customer_orders");

    }

    // onChangeProductPrice(event) {
    //     this.setState({ productprice: event.target.value });
    // }

    // onChangeProductName(event) {
    //     this.setState({ productname: event.target.value });
    // }
    
    // onChangeBundleQuantity(event) {
    //     this.setState({ bundlequantity: event.target.value });
    // }

    onChangeProductName(event) {
        this.setState({ productname: event.target.value });
    }

    onChangeReview(event) {
        this.setState({ review: event.target.value });
    }
    onChangeCustomerName(event) {
        this.setState({ customername: event.target.value });
    }

    onChangeVendorName(event) {
        this.setState({ vendorname: event.target.value });
    }

    onClickBack(event) {
        // this.setState({ bundlequantity: event.target.value });
        this.props.history.push("/view_customer_orders");
    }

    // onDispatchProduct(event) {
    //     const localuser=localStorage.getItem("username");
    //     const prod={productname:event.target.value,email:localuser};
    //     axios.post('http://localhost:4000/dispatch_vendor_product',prod)
    //     .then(response => {
    //         // this.setState({products: response.data});
    //         console.log(response);
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     })     

    //     const newProduct={email:localuser}
    //     axios.post('http://localhost:4000/get_vendor_products_dispatched',newProduct)
    //     .then(response => {
    //         this.setState({products: response.data});
    //         console.log(response);
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     })    
    // }

    onLogout(e){
        e.preventDefault();
        localStorage.removeItem("username");
        localStorage.removeItem("type");
        this.props.history.push("/login");
    }


    render() {
        const localuser=localStorage.getItem("username");
        console.log(localuser);
            return (
                <div>
                <Router>
                <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    {/* <Link to="/" className="nav-link">App</Link> */}
                    <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-brand">
                        Hello {localuser}!
                        </li>
                        <li className="navbar-item">
                            <Link onClick={this.onLogout} className="nav-link">Logout</Link>
                        </li>
                    </ul>
                    </div>
                </nav>
                </div>
            </Router>
            <br/>    
            <br/>    
            <div className="form-group">
                <button onClick={this.onClickBack} className="btn btn-secondary">Go Back</button>
            </div>    

            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Customer:</label>
                        <input type="text" 
                            className="form-control" 
                            value={localStorage.getItem("username")}
                            onChange={this.onChangeCustomerName}
                            />
                    </div>
                    <div className="form-group">
                        <label>Vendor:</label>
                        <input type="text" 
                            className="form-control" 
                            value={localStorage.getItem("currentvendor")}
                            onChange={this.onChangeVendorName}
                            />  
                    </div>
                    <div className="form-group">
                        <label>Product:</label>
                        <input type="text" 
                            className="form-control" 
                            value={localStorage.getItem("currentproduct")}
                            onChange={this.onChangeProductName}
                            />  
                    </div>

                    <div className="form-group">
                        <label>Review:</label>
                        <input type="text" 
                            className="form-control" 
                            value={this.state.review}
                            onChange={this.onChangeReview}
                            />  
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit Review" className="btn btn-primary"/>
                    </div>

                </form>    
               
            </div>

            </div>
            )
        }
}