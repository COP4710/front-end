import React, { Component } from 'react'
import { Tab, Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import baseAPI from '../util/path.js'

export class EventComponent extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            "event_id": this.props.event_id,
            "user": this.props.curret_user
        }
    }

    onClick = event => {
        if (event.target.name == "JoinButton")
        {
            var dataOut = {
                "event_id": this.state.event_id,
                "user_username": this.state.user
            }

            axios.post(baseAPI + "event/join-event", dataOut)
            .then(res => {
            if (res.status == 200){
                console.log("We did it")
            }})
        }

        if (event.target.name == "DeleteButton")
        {
            var dataOut = {
                "event_id": this.state.event_id
            }
            console.log(dataOut)

            axios.post(baseAPI + "event/delete-event", dataOut)
            .then(res => {
            if (res.status == 200){
                console.log("We did it")
            }})
        }
    }

    render(){
        var eventJoinButton = null // Default off for users already signed up or no logged in
        var eventDeleteButton = null // Default off for users already signed up or no logged in
        if (this.props.permissionLevel == "p" || this.props.permissionLevel == "s" || this.props.permissionLevel == "a")
             // need to check to make sure the user isn't already signed up
            eventJoinButton = <Button name="JoinButton" href="/"
                        variant="primary" onClick={this.onClick}>Join</Button>
        if (this.state.user == this.props.host_username)
            eventDeleteButton = <Button name="DeleteButton" href="/"
                variant="primary" onClick={this.onClick}>Delete</Button>

        // var dataOut = {
        //     title: this.state.eventNameBox,
        //     description: this.state.eventDescriptionBox,
        //     url: this.state.eventURLBox,
        //     address: this.state.eventAddressBox,
        //     city: this.state.eventCityBox,
        //     start_date: this.state.eventStartDateBox,
        //     end_date: this.state.eventEndDateBox,
        //     host_username: this.props.username
        // }

        return(
            <Card>
                <Card.Title>{this.props.title} at {this.props.address}, {this.props.city}</Card.Title>
                <Card.Body>
                    <Card.Text>Description: {this.props.description}</Card.Text>
                    <Card.Text>Event Dates: {this.props.start_date} to {this.props.end_date}</Card.Text>
                    <Card.Text>Link to Event Page: {this.props.url}</Card.Text>
                    {eventJoinButton}
                    {eventDeleteButton}
                </Card.Body>

            </Card>
        );
    }
}

export default EventComponent;