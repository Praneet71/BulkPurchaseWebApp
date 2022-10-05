import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import {FormControlLabel,FormLabel,RadioGroup,StyledRadio} from 'react-bootstrap'
import RadioGroup from "@material-ui/core/RadioGroup";
import {FormControlLabel} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import StyledRadio from "@material-ui/core/Radio";
import "bootstrap/dist/css/bootstrap.min.css";

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            mobile:'',
            email: '',
            password: '',
            type:'customer'
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.onSubmitTypeC = this.onSubmitTypeC.bind(this);
        // this.onSubmitTypeV = this.onSubmitTypeV.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeMobile(event) {
        this.setState({ mobile: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeType(event){
        this.setState({ type: event.target.value });
    }

    // onSubmitTypeV(e){
    //     e.preventDefault();
    //     localStorage.setItem("type","vendor");
    //     this.props.history.push("/create");
    // }

    onSubmit(e) {
        e.preventDefault();
        let newUser={}
        if(this.state.type==='vendor'){
                newUser = {
                name: this.state.name,
                mobile: this.state.mobile,
                email: this.state.email,
                password: this.state.password,
                type:this.state.type,
                ratingsum:0,
                count:0
            }
        }
        else{
                newUser = {
                name: this.state.name,
                mobile: this.state.mobile,
                email: this.state.email,
                password: this.state.password,
                type:this.state.type
                }
        }

        // console.log(.type);

        // if(newUser.type==='customer'){
        axios.post('http://localhost:4000/register', newUser)
             .then(res => console.log(res.data));
        // }
        // else{
        //     axios.post('http://localhost:4000/register_vendor', newUser)
        //          .then(res => console.log(res.data));
        //     }

        this.setState({
            name: '',
            mobile:'',
            email: '',
            password: '',
            type: 'customer'
        });
    }
// }

    render() {
        return (
            <div>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* <Link to="/" className="navbar-item">App</Link> */}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                    {/* <li className="navbar-item">
                        <Link to="/" className="nav-link">Users</Link>
                    </li> */}
                    <li className="navbar-item">
                        <Link to="/create" className="navbar-brand">Create User</Link>
                    </li>
                    <br/><br/>
                    <li className="navbar-item">
                        <Link to="/login" className="nav-link">Sign In</Link>
                    </li>
                    </ul>
                </div>
                </nav>

                <br/> 
             </div>

            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Mobile: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.mobile}
                               onChange={this.onChangeMobile}
                               />  
                    </div>
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
                        <FormLabel component="legend">Select User Type</FormLabel>
                        <RadioGroup
                        defaultValue={this.state.type}
                        aria-label="gender"
                        name="customized-radios"
                        onChange={this.onChangeType}
                        >
                        <FormControlLabel
                            value='vendor'
                            control={<StyledRadio />}
                            label="Vendor"
                        />
                        <FormControlLabel
                            value='customer'
                            control={<StyledRadio />}
                            label="Customer"
                        />
                        </RadioGroup>
                     </div>
                     <div className="form-group">
                        <input type="submit" value="Sign Up" className="btn btn-primary"/>
                    </div>
                    </form>
            </div>
            <div>
                {/* <form>
                    <div className="form-group">
                        <input type="radio" onClick={this.onSubmitTypeV} name="vendor" value="vendor"/>
                        <label>Vendor</label><br/>
                    </div>
                    <div className="form-group">
                        <input type="radio"  onClick={this.onSubmitTypeC} name="customer" value="customer"/>
                        <label >Customer</label><br/>
                    </div>
                </form>     */}

            </div>
            </div>
        )
    }
}