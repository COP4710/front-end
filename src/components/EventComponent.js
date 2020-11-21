import React, { Component } from 'react'
import { Tab } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

export class EventComponent extends React.Component {

    render(){
        return(
            <Card>
                <Card.Title>"Event Name" at "Location"</Card.Title>
                <Card.Body>
                    <Card.Text>Event Date: "Date" From "Start Time" to "End Time"</Card.Text>
                    <Card.Text>Contact through email at "Email" or call "Phone Number"</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default EventComponent;