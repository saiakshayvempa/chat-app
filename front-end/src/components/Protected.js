import React from 'react';
import {Navigate,Outlet } from 'react-router-dom'

const Protected = () => {
    const isAuthenticated = localStorage.getItem('login');

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;