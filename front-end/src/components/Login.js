import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Logo from "../assets/images/logo.png";
import backgroundImage  from "../assets/images/background.jpg";
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

class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            password: ""
        };
    }

    login() {
        console.warn(this.state);
        fetch(`http://localhost:5100/login`)
            .then((data) => data.json())
            .then((resp) => {
                console.warn("resp", resp);
                const user = resp.find(user => user.name === this.state.name && user.password === this.state.password);
                if (user) {
                    localStorage.setItem("login", JSON.stringify([user]));
                    this.props.router.navigate('/list');
                } else {
                    alert("Please check credentials");
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("An error occurred during login");
            });
    }

    render() {
        return (
            <div>
                <NavBarMenu />

                <div>
                    <div className='left-login'>
                        
                        <br /><br />
                        <p className='NameText'>SignIn to Stay connected with everyone</p><br /><br />
                        <img
                            className="small-logo"
                            src={Logo}
                            alt="logo"
                        />
                        <br />
                        <br />
                        <br />
                        <br />

                        <input
                            type="text"
                            placeholder="Enter the Name"
                            name="user"
                            onChange={(event) => this.setState({ name: event.target.value })}
                        /><br /><br />
                        <input
                            type="password"
                            placeholder="Enter the Password"
                            name="password"
                            onChange={(event) => this.setState({ password: event.target.value })}
                        /><br /><br />
                        <button onClick={() => { this.login() }} className="btn btn-primary">Login</button><br /><br />

                        <p className='NameText'>Don't have an Account.....?</p><br />
                        <Link to={"/register"} className="btn btn-primary">SignUp</Link>
                    </div>
                    <div className='right-login'  style={{ backgroundImage: `url(${backgroundImage})` }}>
                    </div>

                </div>




            </div>
        );
    }
}

export default withRouter(Login);
