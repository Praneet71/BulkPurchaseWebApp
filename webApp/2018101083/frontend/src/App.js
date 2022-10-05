import React from 'react';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import LoginUser from './components/login.component'
// import LogoutUser from './components/logout.component'
import ViewCustomer from './components/viewcustomer'
import ViewVendor from './components/viewvendor'
// import ViewVendor from './components/customerquantity'
import CustomerQuantity from './components/customerquantity';
import VendorReadyDispatch from './components/vendor_ready_dispatch';
import VendorDispatched from './components/vendor_dispatched';
import ViewCustomerOrders from './components/view_customer_orders';
import ReviewProduct from './components/review_product';
import ProductReviews from './components/view_product_reviews';


function App() {
  const localuser=localStorage.getItem("username");
  return (
    <Router>
      <div className="container">
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Sign In</Link>
              </li>
            </ul>
          </div>
        </nav> */}

        <Redirect from="/" to="/login" />       
        <br/>
        <Route path="/" exact component={UsersList}/>
        <Route path="/create" exact component={CreateUser}/>
        <Route path="/login" exact component={LoginUser}/>
        <Route path="/viewcustomer" exact component={ViewCustomer}/>
        <Route path="/viewvendor" exact component={ViewVendor}/>
        <Route path="/customerquantity" exact component={CustomerQuantity}/>
        <Route path="/vendor_ready_dispatch" exact component={VendorReadyDispatch}/>
        <Route path="/vendor_dispatched" exact component={VendorDispatched}/>
        <Route path="/view_customer_orders" exact component={ViewCustomerOrders}/>
        <Route path="/review_product" exact component={ReviewProduct}/>
        <Route path="/view_product_reviews" exact component={ProductReviews}/>
        {/* <Route path="/logout" exact component={LogoutUser}/> */}
      </div>
    </Router>
  );
}

export default App;
