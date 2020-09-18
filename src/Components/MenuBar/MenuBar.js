import React, { useContext } from 'react';
import logo from '../../logo/Logo.png';
import {Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const MenuBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
            <Container  className="menubar">
                <Navbar>
                    <img src={logo} alt=""/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        
                        </Nav>
                        <Form inline>
                            <Nav className="menubar-nav">
                                <Link to="/home">Home</Link>
                                <Link to="/destination/">Destination</Link>
                                <Link to="/booking/:selectPlace">Booking</Link>
                            </Nav>
                            <Link to="/login"><Button variant="warning">Login</Button></Link>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
    );
};

export default MenuBar;



//   <Link to="/home">Home</Link>
//                                 <Link to="/destination">Destination</Link>
//                                 <Link to="/booking">Booking</Link>
//                                 <Link to="/contact">Contact</Link>