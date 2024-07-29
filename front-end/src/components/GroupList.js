import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBarMenu from "./NavBarMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faGear, faPlus, faNewspaper } from '@fortawesome/free-solid-svg-icons';


class GroupList extends Component {
    constructor() {
        super();
        this.state = {
            list: null
        };
    }

    componentDidMount() {
        this.getData();
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

    delete(group_id) {
        fetch('http://localhost:5100/GroupDelete', {
            method: "POST",
            body: JSON.stringify({ id: group_id })
        }).then((result) => {
            result.json().then(resp => {
                console.warn(resp);
                alert("This Group Info has been deleted");
                this.getData();
            });
        });
    }

    render() {
        return (
            <div>
                <NavBarMenu />
                <div>
                    <div className="card-bar">
                        <div className="card-body">
                            <h5 className="card-title">Maintaining Gangs</h5>
                            <p className="card-text">You prevent kids from joining gangs by offering after-school programs, sports, mentoring, and positive engagement with adults...</p>
                            <Link to={"/create"} className="btn btn-primary">Add Group</Link>
                        </div>
                    </div> 
                </div>
                {
                    this.state.list ?
                    <div>
                       
                        <div className="card-list">
                            {
                                this.state.list.map((item, i) =>
                                    <div className="card" key={i}>
                                        <h5 className="card-title">{item.group_name}</h5>
                                        <img src="https://picsum.photos/id/237/200/300" alt="Jane" className="profile-image" />
                                        <div className="card-body">
                                            
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                        <li className="list-group-item">{item.id}</li>
                                            <li className="list-group-item">Admin</li>
                                            <li className="list-group-item">{item.group_admin}</li>
                                        </ul>
                                        <div className="card-body">
                                            <Link to={"/detail/" + item.id}><FontAwesomeIcon icon={faNewspaper} color="blue" /></Link>
                                            <Link to={"/update/" + item.id}><FontAwesomeIcon icon={faEdit} color="blue" /></Link>
                                            <span onClick={() => this.delete(item.id)}><FontAwesomeIcon icon={faTrash} color="red" /></span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    : <p>Please Wait.....</p>
                }
                <div>
                    <div className="card-bar">
                        <div className="card-body">
                            <h5 className="card-title">Maintaining Gangs</h5>
                            <p className="card-text">You prevent kids from joining gangs by offering after-school programs, sports, mentoring, and positive engagement with adults...</p>
                            <a href="/create" className="btn btn-primary">Add Group</a>
                        </div>
                    </div> 
                   
                </div>
            </div>
        );
    }
}

export default GroupList;
