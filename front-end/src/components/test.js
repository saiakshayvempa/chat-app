import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import NavBarMenu from "./NavBarMenu";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
            chatMessages: [],
            loading: true,
            msg: ""
        };
    }

    componentDidMount() {
        this.getData();
        this.getChatMessages();
    }

    getData() {
        fetch('http://localhost:4000/people/' + this.props.router?.params.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((result) => {
            result.json().then(resp => {
                this.setState({ list: resp.ppl, loading: false });
                console.warn(resp);
            });
        }).catch(error => {
            console.error("Error fetching data: ", error);
            this.setState({ loading: false });
        });
    }

    getChatMessages() {
        fetch('http://localhost:4000/chat/' + this.props.router?.params.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((result) => {
            result.json().then(resp => {
                this.setState({ chatMessages: resp, loading: false });
                console.warn(resp);
            });
        }).catch(error => {
            console.error("Error fetching chat messages: ", error);
            this.setState({ loading: false });
        });
    }

    send() {
        console.warn(this.state);
        console.warn(this.props.router.params.id);
        console.warn(localStorage.getItem('login'));

        const user = JSON.parse(localStorage.getItem('login')); // Assuming 'login' is stored as a JSON string
        if (!user || !user[0]) {
            alert("User is not logged in");
            return;
        }

        const data = {
            user: user[0],
            group_id: this.props.router.params.id,
            message: this.state.msg
        };

        fetch("http://localhost:4000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            response.json().then((resp) => {
                console.warn("chat", resp);
                if (resp.success) {
                    this.getChatMessages(); // Refresh chat messages
                    this.setState({ msg: "" }); // Clear input field
                } else {
                    alert("Failed to send message");
                }
            });
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    render() {
        return (
            <div>
                <NavBarMenu />
                <h1>Group Detail</h1>
                <div className='chat'>
                    <div className='bar'>
                        <p>Group Chats</p>
                    </div>
                    <div className='text-window'>
                        {this.state.chatMessages.map((message, index) => (
                            <div key={index}>
                                {Object.entries(message).map(([sender, text]) => (
                                    <p key={sender}><strong>{sender}:</strong> {text}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className='send'>
                        <input
                            type="text"
                            placeholder="Type the message here ....."
                            value={this.state.msg}
                            onChange={(event) => this.setState({ msg: event.target.value })}
                        />
                        <button onClick={() => { this.send() }}>Send</button>
                    </div>
                </div>
                {
                    this.state.list ?
                        <div className='non-chat'>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Amount</th>
                                        <th><FontAwesomeIcon icon={faGear} color="Black" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.list.map((item, i) =>
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.age}</td>
                                                <td>{item.amount}</td>
                                                <td>
                                                    <FontAwesomeIcon icon={faEdit} color="blue" />
                                                    <FontAwesomeIcon icon={faTrash} color="Red" />
                                                </td>
                                            </tr>)
                                    }
                                </tbody>
                            </Table>
                            <div className='non-chat'>
                                <Link to={"/addpeople/" + this.props.router?.params.id}><FontAwesomeIcon icon={faPlus} color="Green" /></Link>
                            </div>
                        </div>
                        : <p>Please Wait.....</p>
                }
            </div>
        );
    }
}

export default withRouter(GroupDetail);
