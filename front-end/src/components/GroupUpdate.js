import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu"

import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
  
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



class GroupUpdate extends Component {
    constructor ()
    {
        super();
        this.state={
            group_name:null,
            group_admin:null
        }
       
    }
    // componentDidMount ()
    // {
    //     fetch('http://localhost:4000/groups/'+this.props.router?.params.id).then((response)=>{
    //         response.json().then((result)=>{
    //             console.warn(result)
    //             this.setState({
    //                 group_name:result.group_name
    //             })
    //         })
    //     })
    // }

     // update() {
    //     fetch('http://localhost:4000/groups/'+this.props.router?.params.id,{
    //         method:"PUT",
    //         header:{
    //             'Content-Type':'application/json'
    //         },
    //         body : JSON.stringify(this.state)
    //     }).then((result)=>{
    //         result.json().then(resp=>{
    //             console.warn(resp)
    //             alert("This Group Info has been updated")
    //         })
            
    //     })
    // }

    componentDidMount ()
    {   
        console.warn("gruoo_id",this.props.router?.params.id);
        const groupId = parseInt(this.props.router?.params.id, 0);
        fetch('http://localhost:5100/GroupMount', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: groupId}) // Example payload
        }).then((response)=>{
            response.json().then((result)=>{
                console.warn(result)
                this.setState({
                    group_name:result.group_name,
                    group_admin:result.group_admin,
                    id:result.id
                })
            })
        })
    }

   

    update() {
        console.warn("gruoo_id",this.props.router?.params.id);
        const groupId = parseInt(this.props.router?.params.id, 0);
        console.warn("this.state for uodate",this.state)
        fetch('http://localhost:5100/groupsUpdate',{
            method:"POST",
            header:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({group_admin:this.state.group_admin,group_name: this.state.group_name,id:groupId})
        }).then((result)=>{
            result.json().then(resp=>{
                console.warn(resp)
                alert("This Group Info has been updated")
            })
            
        })
    }
    
    render() {

        console.warn(this.state);
        console.log(this.props)
        return (
            <div>
                <NavBarMenu/>
                <h1>Group Update</h1>
                <div>
                    
                    <input onChange={(event)=>{this.setState({group_name:event.target.value})}} placeholder='Group Name' value = {this.state.group_name}/><br/>
                    <input onChange={(event)=>{this.setState({group_admin:event.target.value})}} placeholder='Group Admin' value = {this.state.group_admin}/><br/>
                    <button onClick={()=>{this.update()}}> Group Update <FontAwesomeIcon icon={faCoffee} /></button>
                </div>
            </div>
            
        );
    }
}

export default withRouter (GroupUpdate);