import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class ViewCustomer extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            productname:'',
            searchresults:[],
            currvendor:'',
            currproduct:'',
            orderquantity:'',
            productprice:''
        };

        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        this.onLogout=this.onLogout.bind(this);
        // this.onSignup=this.onSignup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitQuantity = this.onSubmitQuantity.bind(this);
        this.onChangeProductName=this.onChangeProductName.bind(this);
        this.onChangeProductPrice=this.onChangeProductPrice.bind(this);
        this.onSelectProduct=this.onSelectProduct.bind(this);
        this.onChangeOrderQuantity=this.onChangeOrderQuantity.bind(this);
        this.onClickCart=this.onClickCart.bind(this);
        this.onClickShowReview=this.onClickShowReview.bind(this);
        this.onSortByPrice=this.onSortByPrice.bind(this);
        this.onSortByAvailability=this.onSortByAvailability.bind(this);
        this.onSortByRating=this.onSortByRating.bind(this);
    }

    // onChangeEmail(event) {
    //     this.setState({ email: event.target.value });
    // }

    // onChangePassword(event) {
    //     this.setState({ password: event.target.value });
    // }  

    onChangeProductName(event) {
        this.setState({ productname: event.target.value });
    }

    onChangeProductPrice(event) {
        this.setState({ productprice: event.target.value });
    }

    onChangeOrderQuantity(event) {
        this.setState({ orderquantity: event.target.value });
    }

    onSortByPrice(key) {
        // let newsearchresults=this.state.searchresults
        // this.setState({ searchresults: newsearchresults.sort((a,b)=>a.productprice > b.productprice) });
        this.setState({
        searchresults: this.state.searchresults.sort(
            (a, b) => parseFloat(a[key]) - parseFloat(b[key])
          )
        })
    }

    onSortByAvailability(key) {
        this.setState({
            searchresults: this.state.searchresults.sort(
                (a, b) => parseFloat(b[key]) - parseFloat(a[key])
              )
            })
    }

    onSortByRating(key) {
        this.setState({
            searchresults: this.state.searchresults.sort(
                (a, b) => parseFloat(b[key]) - parseFloat(a[key])
              )
            })
    }

    onClickCart(event) {
        // this.setState({ orderquantity: event.target.value });
        this.props.history.push("/view_customer_orders");
    }

    onClickShowReview =param =>(event) => {
        console.log(param);
        localStorage.setItem("currentvendor",param);
        this.props.history.push("/view_product_reviews");
    }

    onSelectProduct = param => (event) => {
        // this.setState({ productname: event.target.value });
        // document.getElementById("select quantity").style.visibility="visible";
        console.log("hi");
        console.log(event.target.value);
        // console.log(event.target.value[1]);
        console.log(param);
        this.setState({currvendor:param});
        this.setState({currproduct:event.target.value});
    }

    onLogout(e){
        e.preventDefault();
        localStorage.removeItem("username");
        this.props.history.push("/login");
    }

    // onSignup(e){
    //     e.preventDefault();
    //     localStorage.removeItem("username");
    //     this.props.history.push("/create");
    // }


    onSubmit(e) {
        e.preventDefault();

        const newProduct = {
            productname:this.state.productname,
            searchresults:[]
        }

        // console.log("yo1");

        // axios.post('http://localhost:4000/get',newProduct)
        // .then(response => {
        //     this.setState({searchresults: response.data});
        //     console.log(response);
        // })
        // .catch(function(error) {
        //     console.log(error);
        // }) 

        axios.post('http://localhost:4000/customer_order_search',newProduct)
        .then(response => {
            this.setState({searchresults: response.data});
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        }) 

        this.setState({
            productname:'',
            searchresults:[]
        });

    }

    onSubmitQuantity(e) {
        e.preventDefault();

        const localuser=localStorage.getItem("username")
        const userProduct={email:localuser,vendor:this.state.currvendor,productname:this.state.currproduct,quantity:this.state.orderquantity,status:'waiting'}

        axios.post('http://localhost:4000/create_customer_product',userProduct)
        .then(response => {
            // this.setState({searchresults: response.data});
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        }) 



        const newProduct = {
            email:this.state.currvendor,
            productname:this.state.currproduct,
            orderquantity:this.state.orderquantity
        }

        // console.log("yo1");

        axios.post('http://localhost:4000/customer_order_place',newProduct)
        .then(response => {
            // this.setState({searchresults: response.data});
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        }) 

        this.setState({
            productname:'',
            searchresults:[],
            currvendor:'',
            currproduct:'',
            orderquantity:''
        });

        // this.props.history.push("/viewcustomer");

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
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="h4">Product Search:</label>
                                <input type="text" 
                                    placeholder="Search for a product here"
                                    className="form-control" 
                                    value={this.state.productname}
                                    onChange={this.onChangeProductName}
                                    />
                            </div>
                            
                            <div className="form-group">
                                <input type="submit" value="Search" className="btn btn-primary"/>
                            </div>

                            </form>

                    </div>

                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>Price</th>
                                    <th>Quantity Remaining</th>
                                    <th>Vendor Rating</th>
                                    <div><button onClick={() => this.onSortByPrice("productprice")} className="btn btn-success btn-sm">Sort By Price</button></div>
                                    <div><button onClick={() => this.onSortByAvailability("bundlequantity")} className="btn btn-success btn-sm">Sort By Availability</button></div>
                                    <div><button onClick={() => this.onSortByRating("rating")} className="btn btn-success btn-sm">Sort By Rating</button></div>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                this.state.searchresults.map((currentProduct, i) => {
                                    const diff= currentProduct.bundlequantity-currentProduct.orders;
                                    console.log("diff",diff);
                                    // this.setState({currenvendor:currentProduct.email});
                                    return (
                                        <tr>
                                            <td onClick={this.onClickShowReview(currentProduct.email)}>{currentProduct.email}</td>
                                            <td>{currentProduct.productprice}</td>
                                            <td>{currentProduct.remaining}</td>
                                            <td>{currentProduct.rating}</td>
                                            <td><button onClick={this.onSelectProduct(currentProduct.email)} value={currentProduct.productname} className="btn btn-info">Select Product</button></td>
                                            {/* <td><form id="select quantity" style="visibility:hidden"></form></td> */}
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <form onSubmit={this.onSubmitQuantity}>
                            <div className="form-group">
                                <label>Product Name:</label>
                                <input type="text" 
                                    className="form-control" 
                                    value={this.state.currproduct}
                                    onChange={this.onChangeProductName}
                                    />
                            </div>
                            <div className="form-group">
                                <label>Product Vendor:</label>
                                <input type="text" 
                                    className="form-control" 
                                    value={this.state.currvendor}
                                    onChange={this.onChangeProductPrice}
                                    />  
                            </div>
                            <div className="form-group">
                                <label>Order Quantity:</label>
                                <input type="number" 
                                    className="form-control" 
                                    value={this.state.orderquantity}
                                    onChange={this.onChangeOrderQuantity}
                                    />  
                            </div>
                            
                            <div className="form-group">
                                <input type="submit" value="Order Product" className="btn btn-primary"/>
                            </div>

                        </form>

                        <br/>    
                        <br/>    
                        <div className="form-group">
                        <button onClick={this.onClickCart} className="btn btn-warning">My Orders</button>
                        </div>    

                       
                    </div>
                    
                 </div>
            )
        }
}