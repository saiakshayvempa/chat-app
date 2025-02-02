import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faTrash, faFloppyDisk, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';


const Dropdown = ({ handleSelect, options = [], selectedPerson }) => {
    return (
        <div>
            <select className='form-select' onChange={handleSelect}>
                <option value="">Select a person</option>
                {options?.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
            {selectedPerson && (
                <div>
                    <p><strong>ID:</strong> {selectedPerson.id}</p>
                    <p><strong>Name:</strong> {selectedPerson.name}</p>
                    <p><strong>Age:</strong> {selectedPerson.age}</p>
                    <p><strong>Email:</strong> {selectedPerson.email}</p>
                </div>
            )}
        </div>
    );
};


class GroupChat extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            PeopleID: null,
            FriendId: null,
            FriendName: null,
            GroupID: null,
            GroupName: null,
            group_admin: null,
            show: false,
            listDetails: [],
            options: [],
            selectedPerson: null,
            dropdownValue: '',
            createShow: false,
            chatMessages: [],
            msg: '',
            showEmojiPicker: false,
            stickers: ['😀', '😂', '😍', '👍'], // Example sticker list
            showStickerPicker: false,
            chatMessages: [],
            loading: false,
            error: null

        };
    }

    componentDidMount() {
        this.getData();
        this.getChatMessages();



    }

    groupMount() {
        const groupId = this.state.GroupID;
        console.warn("gruoo_id", groupId);

        fetch('http://localhost:5100/GroupMount', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: groupId }) // Example payload
        }).then((response) => {
            response.json().then((result) => {
                console.warn("69 group chat result", result)
                this.setState({
                    group_name: result.group_name,
                    group_admin: result.group_admin,
                    id: result.id
                })
            })
        })

    }


    update() {

        const groupId = this.state.GroupID;
        console.warn("group_id", groupId);
        console.warn("this.state for uodate", this.state)
        fetch('http://localhost:5100/groupsUpdate', {
            method: "POST",
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ group_admin: this.state.group_admin, group_name: this.state.group_name, id: groupId })
        }).then((result) => {
            result.json().then(resp => {
                console.warn(resp)
                // alert("This Group Info has been updated")
                this.handleClose();
                this.getData();
            })

        })

    }

    deleteGroup() {
        const groupId = this.state.GroupID;
        console.warn("gruoo_id", groupId);
        fetch('http://localhost:5100/GroupDelete', {
            method: "POST",
            body: JSON.stringify({ id: groupId })
        }).then((result) => {
            result.json().then(resp => {
                console.warn(resp);
                // alert("This Group Info has been deleted");
                this.handleClose();
                this.getData();
            });
        });
    }
    createGroup() {
        fetch('http://localhost:5100/GroupInsert', {
            method: "Post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            result.json().then(resp => {
                console.warn(resp)
                // alert("new Group has been created")
                // this.props.router.navigate('/list'); //  Navigate to login
                this.createClose();
                this.getData();
            })

        })

    }


    getData() {
        fetch("http://localhost:5100/groups", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
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

    getDeatilsData() {

        const groupId = this.state.GroupID;
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
                    this.setState({ listDetails: [], loading: false, message: "No data found for this group." });
                } else {
                    this.setState({ listDetails: resp, loading: false, message: "" });
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                this.setState({ loading: false, message: "Error fetching data. Please try again later." });
            });
    }

    delete(people_id) {
        console.warn("gruoo_id", this.props.router?.params.id);
        const groupId = this.state.GroupID;
        fetch('http://localhost:5100/RemovePeople', {
            method: "POST",
            // header:{
            //     'Content-Type':'application/json'
            // },
            body: JSON.stringify({ id: people_id, group_id: groupId }) // Example payload
        }).then((result) => {
            result.json().then(resp => {
                console.warn(resp)
                // alert("This Group Info has been deleted")
                this.getDeatilsData();
                this.fetchCurrentPeople()
                // this.getData()
            })

        })
    }


    getChatMessages = (id, group_name) => {

        console.warn("group_id", id);
        this.setState({ GroupID: id, GroupName: group_name })
        // this.state.GroupID = id
        // this.state.GroupName = group_name
        // const groupId = parseInt(this.props.router?.params.id, 0);

        fetch('http://localhost:5100/GroupChats', {
            method: "POST",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({ group_id: id }) // Example payload
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

    send = () => {

        const groupId = this.state.GroupID
        console.warn("gruoo_id", groupId);

        console.warn("text", this.state.msg)

        const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id
        fetch('http://localhost:5100/GroupSend', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            // body : JSON.stringify(this.state)
            body: JSON.stringify({ "text": this.state.msg, "sender_id": PeopleID, "group_id": groupId })
        }).then((result) => {
            result.json().then(resp => {
                console.warn(resp)
                // alert("Message has beeb sent")
                this.setState({ msg: '' }); // Clear the message input field
                this.getChatMessages(this.state.GroupID, this.state.GroupName)

            })

        })
    }

    fetchCurrentPeople() {
        const groupId = this.state.GroupID
        console.warn("gruoo_id", groupId);
        fetch('http://localhost:5100/FetchGroupDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: groupId })
        })
            .then(result => result.json())
            .then(resp => {
                this.setState({ options: resp });
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }

    addPeople = () => {

        const { selectedPerson } = this.state;

        const groupId = this.state.GroupID
        console.warn("gruoo_id", groupId);
        // Check if a person is selected
        if (!selectedPerson) {
            alert("Please select a person from the dropdown.");
            return;
        }


        const payload = {
            id: selectedPerson.id,
            name: selectedPerson.name,
            age: selectedPerson.age,
            email: selectedPerson.email,
            group_id: groupId
        };

        console.warn("Add People this state", this.state)
        fetch('http://localhost:5100/AddPeopleInsert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(result => result.json())
            .then(resp => {
                console.warn(resp);
                // this.props.router.navigate(`/detail/${this.props.router.params.id}`);
                this.getDeatilsData();
                this.fetchCurrentPeople()
            })
            .catch(error => {
                console.error("Error updating data: ", error);
            });
        // this.fetchCurrentPeople()
    };

    handleShow = () => {
        console.warn("handle show")
        this.setState({ show: true })
        // this.state.show=true
        this.getDeatilsData();
        this.fetchCurrentPeople();
        this.groupMount();
    }
    handleCreate = () => {
        console.warn("330,handleCreate")
        this.setState({ createShow: true })
        // console.warn("332,createShow",createShow)
        // this.state.show=true
        // this.getDeatilsData();
        // this.fetchCurrentPeople();
        // this.groupMount();
    }

    handleClose = () => {
        console.warn("handle close")
        this.setState({ show: false })
    }
    createClose = () => {
        console.warn("handle close")
        this.setState({ createShow: false })
    }

    handleSelect = (e) => {
        const selectedId = parseInt(e.target.value, 10);
        const selectedPerson = this.state.options.find(option => option.id === selectedId);
        this.setState({ dropdownValue: selectedId, selectedPerson });
    };

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
        const { list, listDetails, loading, message, chatMessages, options, selectedPerson, dropdownValue, msg,showEmojiPicker, stickers, showStickerPicker, error  } = this.state;
        // const { list, loading, chatMessages, msg, showEmojiPicker, stickers, showStickerPicker, error } = this.state;
        const PeopleID = JSON.parse(localStorage.getItem('login'))[0].people_id;
        console.warn('317 options', options)
        return (
            <div>
                <NavBarMenu />



                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.GroupName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div>
                            <p>Do you wish to change the group name</p>
                            <input onChange={(event) => { this.setState({ group_name: event.target.value }) }} placeholder='Group Name' value={this.state.group_name} />

                            <span onClick={() => { this.update() }}><FontAwesomeIcon icon={faFloppyDisk} /></span>
                            <button onClick={() => { this.deleteGroup() }}> Group Delete <FontAwesomeIcon icon={faTrash} /></button>
                        </div>
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
                                {listDetails?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <span onClick={() => this.delete(item.id)}><FontAwesomeIcon icon={faTrash} color="red" /></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-center mt-5">
                            <div className="w- p-3 border rounded">
                                <Dropdown
                                    handleSelect={this.handleSelect}
                                    options={options}
                                    selectedPerson={selectedPerson}
                                />
                            </div>
                            <button onClick={this.addPeople}>Add People</button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Create new group model */}

                {/* <Button variant="primary" onClick={this.handleCreate}>
                    Launch static backdrop modal
                </Button> */}

                <Modal
                    show={this.state.createShow}
                    onHide={this.createClose}
                // backdrop="static"
                // keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Group Name :</p>
                        <input onChange={(event) => { this.setState({ group_name: event.target.value }) }} placeholder='Group Name' /><br />
                        {/* <input onChange={(event) => { this.setState({ group_admin: event.target.value }) }} placeholder='Group Admin' /><br /> */}
                        {/* <button onClick={() => { this.createGroup() }}>Add Group</button> */}
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="secondary" onClick={this.createClose}>
                            Close
                        </Button> */}
                        <Button onClick={() => { this.createGroup() }} variant="primary">Greate Group</Button>
                    </Modal.Footer>
                </Modal>

                {/* <h1>Keep in touch with your friends..... </h1> */}
                {/* <Link to={"/addpeople/" + this.props.router?.params.id}><FontAwesomeIcon icon={faPlus} color="Green" /></Link> */}
                <div className='chat'>
                    <div className='bar'>
                        <p className='NameText'>{this.state.GroupName}</p>
                        {/* <Link to={"/detail/" + this.state.GroupID}><FontAwesomeIcon icon={faGear} color="White" /></Link> */}
                        <Button style={{ width: "10px" }} variant="link" onClick={this.handleShow}><FontAwesomeIcon icon={faGear} color="White" /></Button>
                    </div>
                    <div className='text-window'>
                        {chatMessages?.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.sender_id === PeopleID ? 'right' : 'left'}`}
                            >
                                <p className='chatText'> {message.text}</p>
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
                    <p>Please Wait.....</p>
                ) : (
                    <div className='non-chat'>
                        {message ? (
                            <p>{message}</p>
                        ) : (
                            <div>
                                <div className='bar1'>
                                    <p className='NameText'>Group Chats</p>
                                    {/* <Link to={"/create/"}><FontAwesomeIcon icon={faUserPlus} color="White" /></Link> */}
                                    <Button style={{ width: "10px" }} variant="link" onClick={this.handleCreate}><FontAwesomeIcon icon={faUserPlus} color="White" /></Button>
                                </div>
                                <Table stripped bordered hover>

                                    <tbody>
                                        {list?.map((item, i) => (
                                            <tr key={i} className={item.id === this.state.GroupID ? 'table-primary' : ''}>

                                                <td onClick={() => this.getChatMessages(item.id, item.group_name)}>{item.group_name}</td>


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

export default GroupChat;