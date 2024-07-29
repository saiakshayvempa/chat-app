import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu"
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

class GroupCreate extends Component {
    constructor () 
    {
        super();
        this.state={
            group_name:'',
            group_admin:''
        }
    }



    create() {
        fetch('http://localhost:5100/GroupInsert',{
            method:"Post",
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then(resp=>{
                console.warn(resp)
                alert("new Group has been created")
                this.props.router.navigate('/list'); //  Navigate to login
            })
            
        })

    }

    render() {
        return (
            <div>
                <NavBarMenu/>
                <h1>Group Create</h1>
                <div>
                    <input onChange={(event)=>{this.setState({group_name:event.target.value})}} placeholder='Group Name'/><br/>
                    <input onChange={(event)=>{this.setState({group_admin:event.target.value})}} placeholder='Group Admin'/><br/>
                    <button onClick={()=>{this.create()}}>Add Group</button>
                </div>
            </div>
        );
    }
}


export default withRouter(GroupCreate);