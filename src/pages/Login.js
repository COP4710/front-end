import '../App.css';
import {Link, Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

export class Login extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            redirect: false,
            register: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.onClickRegister = this.onClickRegister.bind(this)
    }

    handleChange = event => {
        var value = event.target.value
        this.setState({[event.target.name]: value})
    }

    onClickRegister = event => {
        var regisVal = false;
        if(event.target.name == "RegisterButton" && this.state.register == false) {
            regisVal = true;
        } else if(event.target.name == "LoginButton" && this.state.register == true){
            regisVal = false;
        }
        this.setState({register: regisVal})
    }

    render() {
    if(this.state.redirect)
        return <Redirect to='/'/>

    var title = "Login"
    var loginButton = "Login"
    var newUserButton;
    if(this.state.register) {
        title = "Create New User"
        loginButton = "Register"
        newUserButton = null
    } else {
        title = "Login"
        loginButton = "Login"
        newUserButton = <Button name="RegisterButton" 
                        onClick={this.onClickRegister} 
                        variant="link">Register as New User</Button>
    }

    return (
        <div className="create-appoint-section border border-dark">
            <h1>{title}</h1>
            <br/>
            <Form>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label column >Username:</Form.Label>
                        <Form.Control type="text"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label column >Password:</Form.Label>
                        <Form.Control type="text"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Button name="LoginButton" onClick={this.onClickRegister}>{loginButton}</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <br/>
                        {newUserButton}
                    </Col>
                </Form.Group>
            </Form>
        </div>
        );
    }
}

export default Login