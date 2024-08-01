import React, { Component } from 'react';

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NavBarMenu from "./NavBarMenu";
import Logo from "../assets/images/logo.png";
import backgroundImage from "../assets/images/background.jpg";
import registerImage from "../assets/images/signup.jpg";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: null,
            email: null,
            password: null,
            age: null
        }
    }


    create() {
        console.warn("state_data", this.state)
        const { name, email, password, age } = this.state;
        const payload = {
            name,
            email,
            password,
            age: parseInt(age, 0)  // Convert age to an integer
        };

        console.warn("state_data", payload);

        fetch('http://localhost:5100/register', {
            method: "POST",
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((result) => {
            result.json().then(resp => {
                console.warn(resp)
                alert("Your registration is completed");

                this.props.router.navigate('/login'); //  Navigate to login

            })

        })

    }


    render() {
        return (
            <div>
                <NavBarMenu />
                <div>
                    <div className='left-register' style={{ backgroundImage: `url(${registerImage})` }}>

                    </div>
                    <div className='right-register' >
                        <div className='right-box'>
                            <p className='NameText'>Always stay connected .....</p><br />
                            <img
                                className="small-logo"
                                src={Logo}
                                alt="logo"
                            />
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="left-align-label">Email address</Form.Label>
                                    <Form.Control type="email" onChange={(event) => { this.setState({ email: event.target.value }) }} placeholder="Enter email" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="left-align-label">Password</Form.Label>
                                    <Form.Control type="password" onChange={(event) => this.setState({ password: event.target.value })} placeholder="Password" />
                                    <Form.Text className="custom-text">
                                        We'll never share your password with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="left-align-label">Name</Form.Label>
                                    <Form.Control type="text" onChange={(event) => { this.setState({ name: event.target.value }) }} placeholder="Enter your full name." />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="left-align-label">Age</Form.Label>
                                    <Form.Control type="text" onChange={(event) => { this.setState({ age: event.target.value }) }} placeholder="Enter your age aps per your passport." />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check className="form-label" type="checkbox" label="Send Newsletter's to my Email" />
                                </Form.Group>

                            </Form>
                            <button onClick={() => { this.create() }} className="btn btn-primary">Register</button>
                            <p className='NameText'>Already on Chat-App!</p><br />
                            <Link to={"/login"} className="btn btn-primary">Login</Link><br /><br />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}


export default withRouter(Register);