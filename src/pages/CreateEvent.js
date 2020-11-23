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
        if(["locationDropdown", "categoryDropdown"].includes(event.target.name)
            && event.target.value == "Choose...")
        {
            value = null;
        }
        this.setState({[event.target.name]: value})
    }

    handleOnClickSubmit () {
        // axios.post()

        var dataOut = {
            eventName: this.state.eventNameBox,
            eventDescription: this.state.eventDescriptionBox,
            location: this.state.locationDropdown,
            category: this.state.categoryDropdown,
            email: this.state.eventEmailBox,
            phone: this.state.eventPhoneBox,
            start_time: this.state.eventStartTimeBox,
            end_time: this.state.eventEndTimeBox,
            date: this.state.eventDateBox,
            end_date: this.state.eventEndDateBox,
        }

        this.props.onEventCreated(dataOut)

        this.setState({redirect: true})
    }

    getCategories() {
        return (
            <React.Fragment>
                <option>STEM</option>
                <option>Party</option>
            </React.Fragment>
        )
    }

    getLocations() {
        // Add a pull from the database
        return (
            <React.Fragment>
                <option>Amway</option>
                <option>CFE Arena</option>
            </React.Fragment>
        )
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
                <Form.Group as={Row} >
                    <Form.Group as={Col}>
                        <Form.Label >Location:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="locationDropdown" as="select" defaultValue="Choose..." 
                            onChange={this.handleChange}>
                            <option>Choose...</option>
                            {this.getLocations()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Category:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="categoryDropdown" as="select" defaultValue="Choose..." 
                            onChange={this.handleChange}>
                            <option>Choose...</option>
                            {this.getCategories()}
                        </Form.Control>
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
                        <Form.Label >Start time:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="eventStartTimeBox" onChange={this.handleChange} type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>End time:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="eventEndTimeBox" onChange={this.handleChange} type="text"></Form.Control>
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