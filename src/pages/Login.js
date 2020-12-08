import '../App.css';
import {Link, Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import baseAPI from '../util/path.js'

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

        if(event.target.name == "LoginButton") {
            var dataOut = {
                "username": this.state.usernameBox,
                "password": this.state.passwordBox
            }

            // if this.state.register is false, then login endpoint
            if (this.state.register == false) {
                axios.post(baseAPI + "user/login", dataOut)
                .then(res => {
                console.log(res)
                    if(res.status == 200) {
                        const data = {
                            login: true,
                            username: this.state.usernameBox,
                            permissionLevel: res.data.role
                        }

                        this.props.onAccountChanged(data);
                        this.setState({redirect: true})
                    }
                })  
            }
            // if true, then create user endpoint
            if (this.state.register == true) {
                axios.post(baseAPI + "user/add-user", dataOut)
                .then(res => {
                console.log(res)
                    if(res.status == 200) {
                        const data = {
                            login: true,
                            username: this.state.usernameBox,
                            permissionLevel: "p"
                        }

                        this.props.onAccountChanged(data);
                        this.setState({redirect: true})
                    }
                })        
            }

            // this.setState({usernameBox: ""})
            // this.setState({passwordBox: ""})
        }
    }

    render() {
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

    if(this.state.redirect)
        return <Redirect to="/"/>

    return (
        <div className="create-appoint-section border border-dark">
            <h1>{title}</h1>
            <br/>
            <Form>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label column >Username:</Form.Label>
                        <Form.Control name="usernameBox" type="text" 
                            value={this.state.usernameBox} 
                            onChange={this.handleChange}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label column >Password:</Form.Label>
                        <Form.Control name="passwordBox" type="text" 
                            value={this.state.passwordBox} 
                            onChange={this.handleChange}></Form.Control>
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