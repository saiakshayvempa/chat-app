import React, { Component } from 'react';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NavBarMenu from "./NavBarMenu";
import Logo from "../assets/images/logo.png";
import registerImage from "../assets/images/signup.jpg";
import Divider from '@mui/material/Divider';

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
            confirmPassword: null, // New state property for confirm password
            age: null
        }
    }

    create() {
        console.warn("state_data", this.state)
        const { name, email, password, confirmPassword, age } = this.state;

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const payload = {
            name,
            email,
            password,
            age: parseInt(age, 0)  // Convert age to an integer
        };

        console.warn("state_data", payload);

        fetch('http://localhost:5100/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((result) => {
            result.json().then(resp => {
                console.warn(resp)
                alert("Your registration is completed");
                this.props.router.navigate('/login'); // Navigate to login
            })
        })
    }

    render() {
        return (
            <div>
                <NavBarMenu />
                <div>
                    <div className='left-register' style={{ backgroundImage: `url(${registerImage})` }}></div>
                    <div className='right-register'>
                        <div className='right-box'>
                            <br /> <br />
                            <p className='NameText'>Always stay connected .....</p><br />
                            <img
                                className="small-logo"
                                src={Logo}
                                alt="logo"
                            />
                            <br /> <br />
                            <input
                                type="text"
                                placeholder="Enter the Name"
                                name="email"
                                onChange={(event) => { this.setState({ email: event.target.value }) }}
                            /> <br /><br />
                            <input
                                type="password"
                                placeholder="Enter the Password"
                                name="password"
                                onChange={(event) => this.setState({ password: event.target.value })}
                            /> <br /><br />
                            <input
                                type="password"
                                placeholder="Confirm the Password"
                                name="confirmPassword"
                                onChange={(event) => this.setState({ confirmPassword: event.target.value })}
                            /> <br /><br />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                name="user"
                                onChange={(event) => { this.setState({ name: event.target.value }) }}
                            /> <br /><br />
                            <input
                                type="text"
                                placeholder="Enter your age as per your passport"
                                name="age"
                                onChange={(event) => { this.setState({ age: event.target.value }) }}
                            /> <br /><br />
                            <button onClick={() => { this.create() }} className="btn btn-primary">Register</button>
                            <Divider sx={{
                                color: 'white',
                                '&::before, &::after': {
                                    borderColor: 'white'
                                },
                                '& .MuiDivider-wrapper': {
                                    backgroundColor: 'rgb(87, 178, 194)',
                                    padding: '0 10px',
                                    color: 'white'
                                }
                            }}>
                                or
                            </Divider>
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
