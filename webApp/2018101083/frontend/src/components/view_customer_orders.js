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
            products:[]
        };

        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        this.onLogout=this.onLogout.bind(this);
        // this.onSignup=this.onSignup.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        // this.onChangeProductName=this.onChangeProductName.bind(this);
        // this.onChangeProductPrice=this.onChangeProductPrice.bind(this);
        // this.onChangeBundleQuantity=this.onChangeBundleQuantity.bind(this);
        // this.onDispatchProduct=this.onDispatchProduct.bind(this);
        this.onClickBack=this.onClickBack.bind(this);
        this.onClickVendorRating=this.onClickVendorRating.bind(this);
        this.onClickReviewProduct=this.onClickReviewProduct.bind(this);
    }

    componentDidMount() {
        const localuser=localStorage.getItem("username");
        console.log(localuser);
        const newProduct={email:localuser}
        axios.post('http://localhost:4000/get_customer_products',newProduct)
        .then(response => {
            this.setState({products: response.data});
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })  
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

    onClickBack(event) {
        // this.setState({ bundlequantity: event.target.value });
        this.props.history.push("/viewcustomer");
    }

    onClickVendorRating = param => (event) => {
        // this.setState({ bundlequantity: event.target.value });
        // this.props.history.push("/viewcustomer");
        console.log(param);
        if(param!='placed' && param!='dispatched'){
            return alert("The order has not been placed yet");
        }

        const y=event.target.value;
        const x = prompt("Enter rating for vendor "+y," ");
        console.log(x);
        console.log(y);

        const newProduct={email:y,rating:x};

        axios.post('http://localhost:4000/update_vendor_rating',newProduct)
        .then(response => {
            // this.setState({p: response.data});
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })  

    }


    onClickReviewProduct = param => (event) => {
        // this.setState({ bundlequantity: event.target.value });
        // this.props.history.push("/viewcustomer");
        console.log(param);
        console.log(param.status);
        localStorage.setItem("currentproduct",param.productname)
        localStorage.setItem("currentvendor",param.vendor)
        
        // localStorage.setItem("currentproduct",param.productname)
        // console.log(param);
        const prod=localStorage.getItem("currentproduct");
        console.log(prod);
        if(param.status!='dispatched'){
            return alert("The order has not been dispatched yet");
        }

        this.props.history.push("/review_product");

        // const y=event.target.value;
        // const x = prompt("Enter rating for vendor "+y," ");
        // console.log(x);
        // console.log(y);

        // const newProduct={email:y,rating:x};

        // axios.post('http://localhost:4000/update_vendor_rating',newProduct)
        // .then(response => {
        //     // this.setState({p: response.data});
        //     console.log(response);
        // })
        // .catch(function(error) {
        //     console.log(error);
        // })  

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
    //     axios.post('http://localhost:4000/get_vendor_products_ready_to_dispatch',newProduct)
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            {/* <th>Product Price</th> */}
                            <th>Vendor Name</th>
                            <th>Number Of Orders</th>
                            <th>Dispatch Status</th>
                            {/* <th>Operation</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                                    // localStorage.setItem("currentproduct",currentProduct);
                            return (
                                <tr>
                                    <td>{currentProduct.productname}</td>
                                    {/* <td>{currentProduct.productprice}</td> */}
                                    <td>{currentProduct.vendor}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td>{currentProduct.status}</td>
                                    <td><button onClick={this.onClickVendorRating(currentProduct.status)} value={currentProduct.vendor} className="btn btn-warning">Rate vendor</button></td>
                                    <td><button onClick={this.onClickReviewProduct(currentProduct)} value={currentProduct.vendor} className="btn btn-warning">Product Review</button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>

            </div>
            )
        }
}