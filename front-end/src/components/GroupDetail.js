import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import NavBarMenu from "./NavBarMenu"
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

import {

    Link,
  
  } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear,faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
  

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



class GroupDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: true,
            chatMessages: [],
            msg:"",
            localStorageName: '',
            firstElementName : ""
            
        };
    }
    componentDidMount() {
        this.getData();

        const localStorageData = JSON.parse(localStorage.getItem('login'));
        console.warn("localStorageData",localStorageData)
        let firstElementName = "";
        if (localStorageData && localStorageData.length > 0) {
            // Fetch the name from the first element
            firstElementName = localStorageData[0].people_id || 'sender1';
            console.log("if",firstElementName); // This will log the name or 'sender1' if name is not present
        } else {
            console.log('sender1'); // Default name if local storage is empty or doesn't exist
        }
        const localStorageName = localStorage.getItem('name') || 'sender1';
        this.setState({ localStorageName,firstElementName });
        this.getChatMessages();
        console.log("finally",firstElementName);
    }



    getData() {
        console.warn("group_id", this.props.router?.params.id);
        const groupId = parseInt(this.props.router?.params.id, 0);
        fetch('http://localhost:5100/GroupDetails', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: groupId }) // Example payload
        })
        .then((result) => {
            if (!result.ok) {
                throw new Error(`HTTP error! Status: ${result.status}`);
            }
            return result.json();
        })
        .then((resp) => {
            console.warn("Response:", resp);
            if (resp.message === "No data found" || resp.length === 0) {
                this.setState({ list: [], loading: false, message: "No data found for this group." });
            } else {
                this.setState({ list: resp, loading: false, message: "" });
            }
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
            this.setState({ loading: false, message: "Error fetching data. Please try again later." });
        });
    }
    
    getChatMessages = () => {

        console.warn("gruoo_id",this.props.router?.params.id);
        const groupId = parseInt(this.props.router?.params.id, 0);

        fetch('http://localhost:5100/GroupChats', {
            method: "POST",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({ group_id: groupId }) // Example payload
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((resp) => {
            this.setState({ chatMessages: resp, loading: false });
            console.warn("130",resp);
        })
        .catch((error) => {
            console.error("Error fetching chat messages: ", error);
            this.setState({ loading: false, error: error.message });
        });
    }

    

    delete(people_id)
    {   
        console.warn("gruoo_id",this.props.router?.params.id);
        const groupId = parseInt(this.props.router?.params.id, 0);
        fetch('http://localhost:5100/RemovePeople',{
            method:"POST",
            // header:{
            //     'Content-Type':'application/json'
            // },
            body: JSON.stringify({ id:people_id, group_id:groupId}) // Example payload
        }).then((result)=>{
            result.json().then(resp=>{
                console.warn(resp)
                alert("This Group Info has been deleted")
                this.getData()
            })
            
        })
    }

    send() {
        console.warn("gruoo_id",this.props.router?.params.id);
        const groupId = parseInt(this.props.router?.params.id, 0);
        console.warn("text",this.state.msg)
        console.warn("firstElementName",this.state.firstElementName)
        fetch('http://localhost:5100/GroupSend',{
            method:"Post",
            headers:{
                'Content-Type':'application/json'
            },
            // body : JSON.stringify(this.state)
            body : JSON.stringify({"text":this.state.msg,"sender_id":this.state.firstElementName,"group_id": groupId})
        }).then((result)=>{
            result.json().then(resp=>{
                console.warn(resp)
                alert("Message has beeb sent")
            })
            
        })
    }

    render() {
        const { list, loading, message, chatMessages, firstElementName } = this.state;
    
        return (
            <div>
                <NavBarMenu />
                <h1>Group Detail {firstElementName}</h1>
                <Link to={"/addpeople/" + this.props.router?.params.id}><FontAwesomeIcon icon={faPlus} color="Green" /></Link>
                <div className='chat'>
                    <div className='bar'>
                        <p>Group Chats </p>
                    </div>
                    <div className='text-window'>
                        {chatMessages?.map((message, index) => (
                            <div 
                                key={index}
                                className={`message ${message.sender_id === firstElementName ? 'right' : 'left'}`}
                            >
                                <p><strong>{message.sender}:</strong> {message.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className='send'>
                        <input 
                            type="text" 
                            placeholder="Type the message here ....." 
                            msg="msg" 
                            onChange={(event) => this.setState({ msg: event.target.value })}
                        />
                        <button onClick={() => { this.send() }}>Send</button>
                    </div>
                </div>
                {loading ? (
                    <p>Please Wait.....</p>
                ) : (
                    <div className='non-chat'>
                        {message ? (
                            <p>{message}</p>
                        ) : (
                            <div>
                                <Table stripped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Age</th>
                                            <th>Email</th>
                                            <th><FontAwesomeIcon icon={faGear} color="Black" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list?.map((item, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.age}</td>
                                                <td>{item.email}</td>
                                                <td>
                                                    <span onClick={()=>this.delete(item.id)}><FontAwesomeIcon icon={faTrash} color ="red"/></span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className='non-chat'>
                                    <Link to={"/addpeople/" + this.props.router?.params.id}>
                                        <FontAwesomeIcon icon={faPlus} color="Green" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}    
export default withRouter(GroupDetail);