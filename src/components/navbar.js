import {Navbar, Nav, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import App from '../App'
import '../App.css'

export class EventNavbar extends React.Component {
    constructor(props){
        super(props)

        this.state ={
            loggedIn: this.props.loggedState
        }
    }

    render() {
        console.log(this.state.loggedIn)
        return (
            <Navbar className='navbar-top' bg='dark' variant='dark'>
                <Nav className='container-fluid'>
                    <Nav.Item>
                        <Navbar.Brand href="/">
                            Event System
                        </Navbar.Brand>
                    </Nav.Item>
                    <Nav.Item className='login-button'>
                        <Button href='/' variant="primary">Login</Button>
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }
}

export default EventNavbar