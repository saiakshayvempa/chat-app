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
import { faList, faHome,faComments,faComment, faRightToBracket,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

class NavBarMenu extends Component {

  render() {
    return (
      <div>
        <Navbar style={{ height: "10vh" }} expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#home">Chat-App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto w-100">
                <Nav.Link  href="#home"><Link className='nav-link' to="/"><FontAwesomeIcon icon={faHome} color="Black" />Home</Link></Nav.Link>
                <Nav.Link href="#list"><Link className='nav-link'to="/list"><FontAwesomeIcon icon={faList} color="Black" />Groups</Link></Nav.Link>
                <Nav.Link href="#search"><Link className='nav-link'to="/search"><FontAwesomeIcon icon={faComment} color="Black" />People</Link></Nav.Link>
                <Nav.Link href="#GroupChat"><Link className='nav-link' to="/GroupChat"><FontAwesomeIcon icon={faComments} color="Black" />GroupChats</Link></Nav.Link>
                {/* <Nav.Link href="#signin"><Link to="/signin"><FontAwesomeIcon icon={faSearch} color ="Black"/>SignIn</Link></Nav.Link> */}
                {
                  localStorage.getItem('login') ?
                    <Nav.Link style={{marginLeft:'auto'}}href="#logout"><Link className='nav-link' to="/logout"><FontAwesomeIcon icon={faRightFromBracket} color="Black" />Logout</Link></Nav.Link>
                    :
                    <Nav.Link style={{marginLeft:'auto'}}href="#login"><Link className='nav-link' to="/login"><FontAwesomeIcon icon={faRightToBracket} color="Black" />Login</Link></Nav.Link>

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