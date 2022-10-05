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
    }

        componentDidMount() {
        const localuser=localStorage.getItem("username");
        console.log(localuser);
        const newProduct={email:localStorage.getItem("currentvendor")}
        axios.post('http://localhost:4000/get_vendor_reviews',newProduct)
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
        // this.props.history.pop();
    }

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
            <br/>
            <br/>

            <div>
            <h2>Reviews By Customers</h2>    
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Review</th>
                            {/* <th>Operation</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.vendor_email}</td>
                                    <td>{currentProduct.customer_email}</td>
                                    <td>{currentProduct.productname}</td>
                                    <td>{currentProduct.review}</td>
                                    {/* <td><button onClick={this.onDispatchProduct} value={currentProduct.productname} className="btn btn-success">Dispatch</button></td> */}
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