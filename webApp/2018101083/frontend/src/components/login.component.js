import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class LoginUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password: ''
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onLogout=this.onLogout.bind(this);
        this.onSignup=this.onSignup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }  

    onLogout(e){
        e.preventDefault();
        localStorage.removeItem("username");
        this.props.history.push("/login");
    }

    onSignup(e){
        e.preventDefault();
        localStorage.removeItem("username");
        this.props.history.push("/create");
    }


    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password
        }

        // console.log("yo1");
        axios.post('http://localhost:4000/login', newUser)
             .then(res => {
                //  console.log(res.data);
                //  console.log("yo2");
                //  console.log(res.data.email);
                 localStorage.setItem("username",res.data.email);
                 localStorage.setItem("type",res.data.type);
                 this.props.history.push("/login");
             });

        this.setState({
            email: '',
            password: ''
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
        const localtype=localStorage.getItem("type");
        console.log(localuser);
        if(!localuser){
        return (
            <div>
            <Router>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        {/* <Link to="/" className="navbar-link">App</Link> */}
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                            {/* <li className="navbar-item">
                                <Link to="/" className="nav-link">Users</Link>
                            </li> */}
                            <li className="navbar-item">
                                {/* <Link to="/create" className="nav-link">Create User</Link> */}
                                <Link onClick={this.onSignup} className="nav-link">Create User</Link>
                            </li>
                            <li></li>
                            <br/><br/>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-brand">Sign In</Link>
                            </li>
                            </ul>
                        </div>
                        </nav>

                        <br/>
                </div>
                </Router>    
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Sign In" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
            </div>
        )
        }
        else{
            // <Redirect to="/viewcustomer"/>
            if(localtype==='customer')
            this.props.history.push("/viewcustomer");
            else
            this.props.history.push("/viewvendor");
            return null;
            // return (
            //     <div>
            //     <Router>
            //     <div className="container">
            //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
            //         <Link to="/" className="nav-link">App</Link>
            //         <div className="collapse navbar-collapse">
            //         <ul className="navbar-nav mr-auto">
            //             <li className="navbar-brand">
            //             Hello {localuser}!
            //             </li>
            //             <li className="navbar-item">
            //                 <Link onClick={this.onLogout} className="nav-link">Logout</Link>
            //             </li>
            //         </ul>
            //         </div>
            //     </nav>
            //     </div>
            // </Router>
    
            //     {/* <div>
            //         <form onSubmit={this.onSubmit}>
            //             <div className="form-group">
            //                 <label>Email: </label>
            //                 <input type="text" 
            //                        className="form-control" 
            //                        value={this.state.email}
            //                        onChange={this.onChangeEmail}
            //                        />  
            //             </div>
            //             <div className="form-group">
            //                 <label>Password: </label>
            //                 <input type="text" 
            //                        className="form-control" 
            //                        value={this.state.password}
            //                        onChange={this.onChangePassword}
            //                        />  
            //             </div>
            //             <div className="form-group">
            //                 <input type="submit" value="Sign In" className="btn btn-primary"/>
            //             </div>
            //         </form>
            //     </div> */}
            //      </div>
            // )
        }
    }
}