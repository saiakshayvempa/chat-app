import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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
                    <button onClick={() => { this.login() }}  className="btn btn-primary">Login</button>
                
                  
                    <Link to={"/register"} className="btn btn-primary">SignUp</Link>
                </div>
                <div>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="https://picsum.photos/id/237/800/400" alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://picsum.photos/id/238/800/400" alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://picsum.photos/id/239/800/400" alt="Third slide" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
