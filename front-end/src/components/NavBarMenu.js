import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom'

// import NavBarMenu from "./NavBarMenu"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faList, faHome, faPlus, faSearch, faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons'

class NavBarMenu extends Component {

  render() {
    return (
      <div>
        <Navbar style={{ height: "10vh" }} expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Chat-App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home"><Link to="/"><FontAwesomeIcon icon={faHome} color="Black" />Home</Link></Nav.Link>
                <Nav.Link href="#list"><Link to="/list"><FontAwesomeIcon icon={faList} color="Black" />Groups</Link></Nav.Link>
                <Nav.Link href="#search"><Link to="/search"><FontAwesomeIcon icon={faSearch} color="Black" />People</Link></Nav.Link>
                <Nav.Link href="#GroupChat"><Link to="/GroupChat"><FontAwesomeIcon icon={faSearch} color="Black" />GroupChats</Link></Nav.Link>
                {/* <Nav.Link href="#signin"><Link to="/signin"><FontAwesomeIcon icon={faSearch} color ="Black"/>SignIn</Link></Nav.Link> */}
                {
                  localStorage.getItem('login') ?
                    <Nav.Link href="#logout"><Link to="/logout"><FontAwesomeIcon icon={faUser} color="Black" />Logout</Link></Nav.Link>
                    :
                    <Nav.Link href="#login"><Link to="/login"><FontAwesomeIcon icon={faUser} color="Black" />Login</Link></Nav.Link>

                }

                {/* <Link to="/list">GroupList</Link>
          <Link to="/create">GroupCreate</Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </div>

    );
  }
}

export default NavBarMenu;