// import React, {Component} from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// export default class CustomerQuantity extends Component {
    
//     constructor(props) {
//         super(props);

//         this.state = {
//            quantity:''
//         };

//         // this.onChangeEmail = this.onChangeEmail.bind(this);
//         // this.onChangePassword = this.onChangePassword.bind(this);
//         this.onLogout=this.onLogout.bind(this);
//         // this.onSignup=this.onSignup.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.onChangeQuantity=this.onChangeQuantity.bind(this);
//         // this.onSelectProduct=this.onSelectProduct.bind(this);
//     }

//     // onChangeEmail(event) {
//     //     this.setState({ email: event.target.value });
//     // }

//     // onChangePassword(event) {
//     //     this.setState({ password: event.target.value });
//     // }  

//     onChangeQuantity(event) {
//         this.setState({ quantity: event.target.value });
//     }

//     // onSelectProduct(event) {
//     //     // this.setState({ productname: event.target.value });
//     //     // document.getElementById("select quantity").style.visibility="visible";
        
//     // }

//     onLogout(e){
//         e.preventDefault();
//         localStorage.removeItem("username");
//         this.props.history.push("/login");
//     }

//     // onSignup(e){
//     //     e.preventDefault();
//     //     localStorage.removeItem("username");
//     //     this.props.history.push("/create");
//     // }


//     onSubmit(e) {
//         e.preventDefault();

//         const newProduct = {
//            quantity:this.quantity
//         }

//         // console.log("yo1");

//         axios.post('http://localhost:4000/customer_order',newProduct)
//         .then(response => {
//             this.setState({searchresults: response.data});
//             console.log(response);
//         })
//         .catch(function(error) {
//             console.log(error);
//         }) 

//         this.setState({
//             productname:'',
//             searchresults:[]
//         });

//     }

//     // componentDidMount() {
//     //     axios.get('http://localhost:4000/get_customers')
//     //          .then(response => {
//     //              this.setState({users: response.data});
//     //          })
//     //          .catch(function(error) {
//     //              console.log(error);
//     //          })

//     // }

//     render() {
//         const localuser=localStorage.getItem("username");
//         console.log(localuser);
//             return (
//                 <div>
//                     <Router>
//                         <div className="container">
//                         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                             {/* <Link to="/" className="nav-link">App</Link> */}
//                             <div className="collapse navbar-collapse">
//                             <ul className="navbar-nav mr-auto">
//                                 <li className="navbar-brand">
//                                 Hello {localuser}!
//                                 </li>
//                                 <li className="navbar-item">
//                                     <Link onClick={this.onLogout} className="nav-link">Logout</Link>
//                                 </li>
//                             </ul>
//                             </div>
//                         </nav>
//                         </div>
//                     </Router>
//                     <div>
//                         <form onSubmit={this.onSubmit}>
//                             <div className="form-group">
//                                 <label className="h4">Enter the desired quantity of the product:</label>
//                                 <input type="number" 
//                                     placeholder="Enter the quantity here"
//                                     className="form-control" 
//                                     value={this.state.quantity}
//                                     onChange={this.onChangeQuantity}
//                                     />
//                             </div>
                            
//                             <div className="form-group">
//                                 <input type="submit" value="Search" className="btn btn-primary"/>
//                             </div>

//                             </form>

//                     </div>
            
//                  </div>
//             )
//         }
// }