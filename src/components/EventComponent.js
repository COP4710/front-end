import React, { Component } from 'react'
import { Tab, Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import baseAPI from '../util/path.js'
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';

init("user_LfppCZHI7o7o2NBIGQvBn");

export class EventComponent extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            "event_id": this.props.event_id,
            "user": this.props.current_user
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

                if(this.props.email != null || this.props.email != ''){
                    var templateParams = {
                        user_email: this.props.email,
                        to_name: this.state.user,
                        message: this.state.event_id
                    };
                     
                    emailjs.send('service_8mg8b9u', 'template_f16ff1t', templateParams)
                        .then(function(response) {
                           console.log('SUCCESS!', response.status, response.text);
                        }, function(error) {
                           console.log('FAILED...', error);
                        });
                }
                
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
            eventJoinButton = <Button name="JoinButton"
                        variant="primary" onClick={this.onClick}>Join</Button>
        if (this.state.user == this.props.host_username)
            eventDeleteButton = <Button name="DeleteButton"
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

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let start_date = new Date(this.props.start_date)
        start_date = months[start_date.getMonth()] + " " + start_date.getDate() + ", " + start_date.getFullYear()

        let end_date = new Date(this.props.end_date)
        end_date = months[end_date.getMonth()] + " " + end_date.getDate() + ", " + end_date.getFullYear()

        return(
            <Card>
                <Card.Title>{this.props.title} at {this.props.address}, {this.props.city}</Card.Title>
                <Card.Body>
                    <Card.Text>Description: {this.props.description}</Card.Text>
                    <Card.Text>Event Dates: {start_date} to {end_date}</Card.Text>
                    <Card.Text>Link to Event Page: {this.props.url}</Card.Text>
                    {eventJoinButton}
                    {eventDeleteButton}
                </Card.Body>

            </Card>
        );
    }
}

export default EventComponent;