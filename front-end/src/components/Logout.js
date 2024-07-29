import React from 'react';
import NavBarMenu from "./NavBarMenu"
import {
    Navigate 
  } from 'react-router-dom'
const Logout = (props) => {
    localStorage.clear();
    return <Navigate  to="/login"/>
    
};

export default Logout;