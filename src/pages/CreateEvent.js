import '../App.css';
import {Link, Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import baseAPI from '../util/path.js'

export class CreateEvent extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            redirect: false,
            eventConflict: false
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

        // Express Params
        // var title = req.body.title;
        // var description = req.body.description;
        // var url = req.body.url;
        // var start_date = req.body.start_date;
        // var end_date = req.body.end_date;
        // var address = req.body.address;
        // var city = req.body.city;
        // var host_username = req.body.host_username;

        var dataOut = {
            title: this.state.eventNameBox,
            description: this.state.eventDescriptionBox,
            url: this.state.eventURLBox,
            address: this.state.eventAddressBox,
            city: this.state.eventCityBox,
            start_date: this.state.eventStartDateBox,
            end_date: this.state.eventEndDateBox,
            host_username: this.props.username
        }

        // const dataOutUsername = {
        //     "username": "test",
        //     "password": "test"
        // }

        // axios.post(baseAPI + "user/add-user", dataOutUsername)
        // .then(res => {
        //     console.log(res)
        // })        

        this.props.onEventCreated(dataOut)
        axios.post(baseAPI + "event/add-event", dataOut)
        .then(res => {
            console.log(res)
            if(res.status == 201){
                console.log("Error")
            } else if(res.data.approved == false){
                this.setState({
                    eventConflict: true
                })
                this.setState({redirect: true})
            } else if(res.data.approved == true){
                this.setState({redirect: true})
            }
        })
        
    }

    render() {
    if(this.state.redirect)
        return <Redirect to='/'/>
    
    var eventConflictLabel = null
    if(this.state.eventConflict == true) {
        eventConflictLabel = <Form.Label>Conflict was found, reschedule event.</Form.Label>
    }

    return (
        <div className="create-appoint-section border border-dark">
            {eventConflictLabel}
            <br/>
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
                <Form.Group as={Row}>
                    <Form.Group as={Col}>
                        <Form.Label >Start date:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name="eventStartDateBox" onChange={this.handleChange} type="text"></Form.Control>
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