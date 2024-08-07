import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faPlus, faEdit, faPen, faTrash, faComment } from '@fortawesome/free-solid-svg-icons'
import { Table } from 'react-bootstrap';

class GroupSearch extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            PeopleID: null,
            FriendId: null,
            FriendName: null

        };
    }

    componentDidMount() {
        this.getData();
        this.getChatMessages();

    }

    getData() {
        const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id;
        fetch("http://localhost:5100/Peoplelist", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: PeopleID })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.warn(result);
                this.setState({ list: result });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }

    getChatMessages(frn_id, name) {

        console.warn("getChatMessages - frn_id", frn_id);

        const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id
        this.state.FriendId = frn_id
        this.state.FriendName = name

        console.warn("PeopleID", frn_id === this.state.FriendId);

        fetch('http://localhost:5100/Chats', {
            method: "POST",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({ frn_id: frn_id, people_id: PeopleID }) // Example payload
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((resp) => {
                this.setState({ chatMessages: resp, loading: false });
                console.warn("130", resp);
            })
            .catch((error) => {
                console.error("Error fetching chat messages: ", error);
                this.setState({ loading: false, error: error.message });
            });
    }

    send() {
        console.warn("gruoo_id", this.props.router?.params.id);
        const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id;
        console.warn("78", this.state)
        console.warn("PeopleID", PeopleID);
        console.warn("text", this.state.msg)
        fetch('http://localhost:5100/Send', {
            method: "Post",
            headers: {
                'Content-Type': 'application/json'
            },
            // body : JSON.stringify(this.state)
            body: JSON.stringify({ "text": this.state.msg, "sender_id": this.state.FriendId, "people_id": PeopleID })
        }).then((result) => {
            result.json().then(resp => {
                console.warn(resp)
                // alert("Message has beeb sent")
                this.getChatMessages(this.state.FriendId,this.state.FriendName)
            })

        })
        
    }

    render() {
        const { list, loading, message, chatMessages } = this.state;
        const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id;
        return (
            <div>
                <NavBarMenu />

                {/* <h1>Keep in touch with your friends..... </h1> */}
                {/* <Link to={"/addpeople/" + this.props.router?.params.id}><FontAwesomeIcon icon={faPlus} color="Green" /></Link> */}
                <div className='chat'>
                    <div className='bar'>
                        <p className='NameText'>{this.state.FriendName}</p>
                    </div>
                    <div className='text-window'>
                        {chatMessages?.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.sender_id !== PeopleID ? 'right' : 'left'}`}
                            >
                                <p className='chatText'> {message.text}</p>
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
                                <div className='bar1'>
                                    <p className='NameText'>Chats</p>
                                </div>
                                <Table stripped bordered hover>

                                    <tbody>
                                        {list?.map((item, i) => (
                                            <tr key={i} className={item.id === this.state.FriendId ? 'table-primary' : ''}>

                                                <td onClick={() => this.getChatMessages(item.id, item.name)}>{item.name}</td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className='non-chat'>

                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default GroupSearch;