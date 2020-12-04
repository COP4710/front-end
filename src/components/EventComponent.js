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
            // add user to list of participant
        }

        if (event.target.name == "DeleteButton")
        {
            // remove event from event list
        }
    }

    render(){
        var eventButton = null // Default off for users already signed up or no logged in
        if (this.props.permissionLevel == "User" || this.props.permissionLevel == "Admin")
            if (true) // need to check to make sure the user isn't already signed up
                eventButton = <Button name="JoinButton" href="/"
                            variant="primary" onClick={this.onClick}>Join</Button>
        if (this.props.currentUser == this.props.eventOwner)
            eventButton = <Button name="DeleteButton" href="/"
                variant="primary" onClick={this.onClick}>Delete</Button>

        return(
            <Card>
                <Card.Title>{this.props.eventName} at {this.props.address}, {this.props.city}</Card.Title>
                <Card.Body>
                    <Card.Text>Description: {this.props.eventDescription}</Card.Text>
                    <Card.Text>Event Dates: {this.props.eventDate} - {this.props.eventEndDate}</Card.Text>
                    <Card.Text>Link to Event Page: {this.props.eventURL}</Card.Text>
                    {eventButton}
                </Card.Body>

            </Card>
        );
    }
}

export default EventComponent;