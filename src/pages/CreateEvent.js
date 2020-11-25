import '../App.css';
import {Link, Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

export class CreateEvent extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            redirect: false
        }

        this.handleOnClickSubmit = this.handleOnClickSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = event => {
        var value = event.target.value
        this.setState({[event.target.name]: value})
    }

    handleOnClickSubmit () {
        // axios.post()

        var dataOut = {
            eventName: this.state.eventNameBox,
            eventDescription: this.state.eventDescriptionBox,
            eventURL: this.state.eventURLBox,
            address: this.state.eventAddressBox,
            city: this.state.eventCityBox,
            email: this.state.eventEmailBox,
            phone: this.state.eventPhoneBox,
            date: this.state.eventDateBox,
            end_date: this.state.eventEndDateBox,
            eventOwner: this.props.username,
        }

        this.props.onEventCreated(dataOut)

        this.setState({redirect: true})
    }

    render() {
    if(this.state.redirect)
        return <Redirect to='/'/>

    return (
        <div className="create-appoint-section border border-dark">
            <h1>Request an Event</h1>
            <br/>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column >Event Name:</Form.Label>
                    <Col sm={10}>
                        <Form.Control name="eventNameBox" onChange={this.handleChange} type="text"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Description:</Form.Label>
                    <Col sm={10}>
                        <Form.Control name="eventDescriptionBox" onChange={this.handleChange} type="text"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >URL:</Form.Label>
                    <Col sm={10}>
                        <Form.Control name="eventURLBox" onChange={this.handleChange} type="text"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Group as={Col}>
                        <Form.Label >Address:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="eventAddressBox" onChange={this.handleChange} type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label >City:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="eventCityBox" onChange={this.handleChange} type="text"></Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Group as={Col}>
                        <Form.Label >Email:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="eventEmailBox" onChange={this.handleChange} type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Phone Number:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="eventPhoneBox" onChange={this.handleChange} type="text"></Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Group as={Col}>
                        <Form.Label >Start date:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="eventDateBox" onChange={this.handleChange} type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label >End date:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="eventEndDateBox" onChange={this.handleChange} type="text"></Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group as={Row}>
                <Col>
                    <Button onClick={this.handleOnClickSubmit}>Submit Event</Button>
                </Col>
                </Form.Group>
            </Form>
        </div>
        );
    }
}

export default CreateEvent