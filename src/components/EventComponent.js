import React, { Component } from 'react'
import { Tab } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

export class EventComponent extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Card>
                <Card.Title>{this.props.eventName} at {this.props.eventLocation}</Card.Title>
                <Card.Body>
                    <Card.Text>Event Date: {this.props.eventDate} From {this.props.eventStartTime} to {this.props.eventEndTime}</Card.Text>
                    <Card.Text>Contact through email at {this.props.eventEmail} or call {this.props.eventPhone}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default EventComponent;