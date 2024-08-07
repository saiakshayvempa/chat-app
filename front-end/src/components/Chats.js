import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faEdit, faPen, faTrash, faComment } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'react-bootstrap';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Link } from 'react-router-dom';

class Chats extends Component {
    constructor() {
        super();
        this.state = {
            msg: "",
            list: [],
            PeopleID: null,
            FriendId: null,
            FriendName: null,
            showEmojiPicker: false,
            stickers: ['😀', '😂', '😍', '👍'], // Example sticker list
            showStickerPicker: false,
            chatMessages: [],
            loading: false,
            error: null,
           
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
                this.setState({ list: result });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }

    getChatMessages = (frn_id, name) => {
        if (!frn_id || !name) return;

        this.setState({ FriendId: frn_id, FriendName: name, loading: true });
        const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id;

        fetch('http://localhost:5100/Chats', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
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
            })
            .catch((error) => {
                console.error("Error fetching chat messages: ", error);
                this.setState({ loading: false, error: error.message });
            });
    }

    send = () => {
        const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id;
        fetch('http://localhost:5100/Send', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "text": this.state.msg, "sender_id": this.state.FriendId, "people_id": PeopleID })
        })
            .then((result) => result.json())
            .then(resp => {
                this.setState({ msg: '' });
                this.getChatMessages(this.state.FriendId, this.state.FriendName);
            })
            .catch(error => {
                console.error("Error sending message: ", error);
            });
    }

    addEmoji = (emoji) => {
        this.setState({ msg: this.state.msg + emoji.native });
    };

    toggleEmojiPicker = () => {
        this.setState({ showEmojiPicker: !this.state.showEmojiPicker });
    };

    addSticker = (sticker) => {
        this.setState({ msg: this.state.msg + sticker });
    };

    toggleStickerPicker = () => {
        this.setState({ showStickerPicker: !this.state.showStickerPicker });
    };

    inputChange = (event) => {
        if (event.key === "Enter") {
            this.send();
        } else {
            this.setState({ msg: event.target.value });
        }
    }

    
    render() {
        const { list, loading, chatMessages, msg, showEmojiPicker } = this.state;
        const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id;

        return (
            <div>
                <NavBarMenu />
                <div className='chat'>
                    <div className='bar'>
                        <p className='NameText'>{this.state.FriendName}</p>
                        <Link to={"/calls/" + this.state.FriendId}><FontAwesomeIcon icon={faComment} color="White" /></Link>
                    </div>

                    <div className='text-window'>
                        {chatMessages?.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.sender_id !== PeopleID ? 'right' : 'left'}`}
                            >
                                <p className='chatText'>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className='send'>
                        <input
                            type="text"
                            placeholder="Type the message here ....."
                            onChange={(e) => this.setState({ msg: e.target.value })}
                            onKeyUp={this.inputChange}
                            value={msg}
                        />
                        <div style={{ position: "absolute", bottom: "10.5vh" }}>
                            {showEmojiPicker && <Picker data={data} onEmojiSelect={this.addEmoji} />}
                        </div>
                        <button style={{ width: "5%", backgroundColor: "white", border: "1px solid black" }} onClick={this.toggleEmojiPicker}>😊</button>
                        <button onClick={this.send}>Send</button>
                    </div>
                </div>
                {loading ? (
                    <p>Please wait...</p>
                ) : (
                    <div className='non-chat'>
                        {this.state.error ? (
                            <p>{this.state.error}</p>
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
                            </div>
                        )}
                    </div>
                )}
                
            </div>
        );
    }
}

export default Chats;
