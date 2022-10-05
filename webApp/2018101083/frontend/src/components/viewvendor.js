import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class ViewVendor extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            productname:'',
            productprice:'',
            bundlequantity:'',
            products:[]
        };

        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        this.onLogout=this.onLogout.bind(this);
        // this.onSignup=this.onSignup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeProductName=this.onChangeProductName.bind(this);
        this.onChangeProductPrice=this.onChangeProductPrice.bind(this);
        this.onChangeBundleQuantity=this.onChangeBundleQuantity.bind(this);
        this.onCancelProduct=this.onCancelProduct.bind(this);
        this.onReadyToDispatch=this.onReadyToDispatch.bind(this);
        this.onClickDispatched=this.onClickDispatched.bind(this);
    }

        componentDidMount() {
        const localuser=localStorage.getItem("username");
        console.log(localuser);
        const newProduct = {
            email:localuser,
            productname: this.state.productname,
            productprice: this.state.productprice,
            bundlequantity: this.state.bundlequantity
        }
        axios.post('http://localhost:4000/get_vendor_products',newProduct)
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onChangeProductPrice(event) {
        this.setState({ productprice: event.target.value });
    }

    onChangeProductName(event) {
        this.setState({ productname: event.target.value });
    }
    
    onChangeBundleQuantity(event) {
        this.setState({ bundlequantity: event.target.value });
    }

    onReadyToDispatch(event) {
        // this.setState({ bundlequantity: event.target.value });
        console.log("Entered OnReadyToDispatch");
        this.props.history.push("/vendor_ready_dispatch");
    }

    onClickDispatched(event) {
        // this.setState({ bundlequantity: event.target.value });
        console.log("Entered OnReadyToDispatch");
        this.props.history.push("/vendor_dispatched");
    }

    onCancelProduct(event) {
        const localuser=localStorage.getItem("username");
        const prod={productname:event.target.value,email:localuser};

        axios.post('http://localhost:4000/cancel_customer_product',prod)
        .then(response => {
            // this.setState({products: response.data});
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })  

        axios.post('http://localhost:4000/cancel_vendor_product',prod)
        .then(response => {
            // this.setState({products: response.data});
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })        

        // const localuser=localStorage.getItem("username");
        const newProduct={email:localuser}
        axios.post('http://localhost:4000/get_vendor_products',newProduct)
        .then(response => {
            this.setState({products: response.data});
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })    
    }

    onLogout(e){
        e.preventDefault();
        localStorage.removeItem("username");
        localStorage.removeItem("type");
        this.props.history.push("/login");
    }

    // onSignup(e){
    //     e.preventDefault();
    //     localStorage.removeItem("username");
    //     this.props.history.push("/create");
    // }


    onSubmit(e) {
        e.preventDefault();

        const localuser=localStorage.getItem("username");
        const newProduct = {
            email:localuser,
            productname: this.state.productname,
            productprice: this.state.productprice,
            bundlequantity: this.state.bundlequantity,
            remaining:this.state.bundlequantity,
            orders:0,
            status:'waiting'
        }

        // console.log("yo1");
        axios.post('http://localhost:4000/create_vendor_product', newProduct)
             .then(res => {
                //  console.log(res.data);
                //  console.log("yo2");
                //  console.log(res.data.email);
                //  localStorage.setItem("username",res.data.email);
                //  this.props.history.push("/viewvendor");
             })
             .catch(function(error) {
                console.log(error);
            })

        axios.post('http://localhost:4000/get_vendor_products',newProduct)
        .then(response => {
            this.setState({products: response.data});
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })     

        this.setState({
            productname: '',
            productprice: '',
            bundlequantity:''
        });


      
        // componentDidMount() {
        //     axios.get('http://localhost:4000/get_customers')
        //          .then(response => {
        //              this.setState({users: response.data});
        //          })
        //          .catch(function(error) {
        //              console.log(error);
        //          })
    }

    // componentDidMount() {
    //     axios.get('http://localhost:4000/get_customers')
    //          .then(response => {
    //              this.setState({users: response.data});
    //          })
    //          .catch(function(error) {
    //              console.log(error);
    //          })

    // }

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
            <div>
                <h2>Add Product</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Name:</label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.productname}
                               onChange={this.onChangeProductName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Product Price:</label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.productprice}
                               onChange={this.onChangeProductPrice}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Bundle Quantity:</label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.bundlequantity}
                               onChange={this.onChangeBundleQuantity}
                               />  
                    </div>
                    
                     <div className="form-group">
                        <input type="submit" value="Add Product" className="btn btn-primary"/>
                    </div>

                    </form>
                    <br/>
                    <div className="form-group">
                        <button onClick={this.onReadyToDispatch} className="btn btn-warning">Ready To Dispatch Orders</button>
                    </div>

                    <div className="form-group">
                        <button onClick={this.onClickDispatched} className="btn btn-info">View Dispatched Orders</button>
                    </div>

                    
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Bundle Quantity</th>
                            <th>Number Of Orders</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.productname}</td>
                                    <td>{currentProduct.productprice}</td>
                                    <td>{currentProduct.bundlequantity}</td>
                                    <td>{currentProduct.orders}</td>
                                    <td><button onClick={this.onCancelProduct} value={currentProduct.productname} className="btn btn-danger">Cancel</button></td>
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