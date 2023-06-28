import React from 'react';
import { Nav, Navbar } from 'rsuite';
import Login from './Login/Login';
function Menu() {
    return (
        <Navbar>
            <div className='container'>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav pullRight>
                <Nav.Item href='/about'>About Me</Nav.Item>
                <Login />
            </Nav>
            </div>
        </Navbar>
    );
}

export default Menu;