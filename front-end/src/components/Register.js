import React, { Component } from 'react';

import { useLocation, useNavigate, useParams } from "react-router-dom";


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

    constructor () 
    {
        super();
        this.state={
            name:null,
            email:null,
            password:null,
            age:null
        }
    }


    create() {
        console.warn("state_data",this.state)
        const { name, email, password, age } = this.state;
        const payload = {
            name,
            email,
            password,
            age: parseInt(age, 0)  // Convert age to an integer
        };

        console.warn("state_data", payload);

        fetch('http://localhost:5100/register',{
            method:"POST",
            header:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(payload)
        }).then((result)=>{
            result.json().then(resp=>{
                console.warn(resp)
                alert("Your registration is completed");
               
                this.props.router.navigate('/login'); //  Navigate to login
                
            })
            
        })
       
    }


    render() {
        return (
            <div>
                <input onChange={(event)=>{this.setState({name:event.target.value})}} placeholder='Name'/><br/>
                <input onChange={(event)=>{this.setState({email:event.target.value})}} placeholder='Email'/><br/>
                <input onChange={(event)=>{this.setState({age:event.target.value})}} placeholder='Age'/><br/>
                <input type="password" placeholder="Enter the Password" name="password" onChange={(event) => this.setState({ password: event.target.value })}/>
                <button onClick={()=>{this.create()}}>Register</button>
            </div>
        );
    }
}


export default withRouter(Register);