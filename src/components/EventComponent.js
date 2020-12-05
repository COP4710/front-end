import React, { Component } from 'react'
import { Tab, Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

export class EventComponent extends React.Component {
    constructor(props){
        super(props)
    }

    onClick = event => {
        if (event.target.name == "JoinButton")
        {
            // var event_id = req.body.event_id;
            // var user_id = req.body.user_id;

            //this.props.key = event.id
            //this.props.currentUser
            //axios.post call for join event -> send it the event id & username

        }

        if (event.target.name == "DeleteButton")
        {
            // remove event from event list
        }
    }

    render(){
        var eventJoinButton = null // Default off for users already signed up or no logged in
        var eventDeleteButton = null // Default off for users already signed up or no logged in
        if (this.props.permissionLevel == "p" || this.props.permissionLevel == "s" || this.props.permissionLevel == "a")
             // need to check to make sure the user isn't already signed up
            eventJoinButton = <Button name="JoinButton" href="/"
                        variant="primary" onClick={this.onClick}>Join</Button>
        if (this.props.currentUser == this.props.host_username)
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
                    <Card.Text>Event Dates: {this.props.start_date} - {this.props.end_date}</Card.Text>
                    <Card.Text>Link to Event Page: {this.props.url}</Card.Text>
                    {eventJoinButton}
                    {eventDeleteButton}
                </Card.Body>

            </Card>
        );
    }
}

export default EventComponent;