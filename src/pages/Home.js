import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import EventComponent from '../components/EventComponent'
import '../App.css';
import { Redirect } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import baseAPI from '../util/path.js'

export class Home extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            redirect: false,
            SearchType: "Date",
            eventList: new Array
        }

        this.handleClick = this.handleClick.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleClick() {
        this.setState(
            {redirect: true}
        )
    }

    onChange = event => {
        var value = event.target.value
        this.setState({[event.target.name]: value})
    }

    handleChange = event => {
        var value = event.target.value
        this.setState({[event.target.name]: value})
    }

    onSearchClick = event => {

        // Participant Level

        if (this.state.SearchType == "Date") {
            var dataOut = {
                "start_date": this.state.startDateBox,
                "end_date": this.state.endDateBox
            }

            var searchPostType = "event/filter-date"
        }

        else if (this.state.SearchType == "City") {
            var dataOut = {
                "city": this.state.eventSearchBox
            }

            var searchPostType = "event/filter-city"
        }

        else if (this.state.SearchType == "Joined Events" && this.props.username != null) {
            var dataOut = {
                "user_username": this.props.username
            }

            var searchPostType = "event/search-user"
        }

        // Admin Level

        else if (this.state.SearchType == "My Events" && this.props.username != null) {
            var dataOut = {
                "host_username": this.props.username
            }

            var searchPostType = "event/search-admin"
        }


        // Same thing as above but date check needs to be implemented in axios
        else if (this.state.SearchType == "My Active Events") {
            var dataOut = {
                "host_username": this.props.username
            }

            var searchPostType = "event/search-admin"
        }
        
        // Super Admin Level

        else if (this.state.SearchType == "Admin") {
            var dataOut = {
                "host_username": this.state.eventSearchBox
            }

            var searchPostType = "event/search-admin"
        }

        else if (this.state.SearchType == "Participant") {
            var dataOut = {
                "user_username": this.state.eventSearchBox
            }

            var searchPostType = "event/search-user"
        }

        axios.post(baseAPI + searchPostType, dataOut)
        .then(res => {
        if (res.status == 200){
            var tempEventList = res.data.data
            if(this.state.SearchType == "My Active Events") {
                // Go through event list and remove events that are in the past
            }
            this.setState({eventList: tempEventList})
        }})
    }

    render() {
        if(this.state.redirect)
        {
            return <Redirect to='/createevent'/>
        }
        
        // var searchBar;
        // if(this.state.SearchType == "Date") {
        //     searchBar = <FormControl aria-label="Default" 
        //                 aria-describedby="inputGroup-sizing-default"
        //                 />
        // } else if(this.state.SearchType == "Location"){
        //     // Implement: Add Get Locations from API Here
        //     searchBar = <FormControl
        //                 aria-label="Default"
        //                 aria-describedby="inputGroup-sizing-default"
        //                 as="select"
        //                 >
        //                     <option>Amway</option>
        //                     <option>Test</option>
        //                 </FormControl>
        // }


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

        // Add in Event ID from Database
        // Keys should be event ID for event components
        // axios.get call -> give the list of events for that query, change key for event.id

        console.log(this.state.eventList)

        try{var eventComponents = (
            <div>
                {this.state.eventList.map(event => <EventComponent event_id={event.event_id} title={event.title} 
                url={event.event_homepage} description={event.description} address={event.address} 
                city={event.city} start_date={event.start_date} end_date={event.end_date} 
                permissionLevel={this.props.permissionLevel} current_user={this.props.username} host_username={event.host_username}/>)}
            </div>
        )}
        catch(err){}
        
        console.log(eventComponents)

        var homeText = 'Home'
        if(this.props.loggedState == "true") {
            // Shows if they are a user, admin, or superadmin
            homeText += ": " + this.props.permissionLevel
        }

        var createEvent = null
        // if statement commented out since we don't have permission levels setup yet
        if (this.props.permissionLevel == "p" || this.props.permissionLevel == "a" || this.props.permissionLevel == "s")
            createEvent = <Button onClick={this.handleClick}>Create Event</Button>

        var formOptions = [<option>Date</option>, <option>City</option>]
        // statements commented out since we don't have permission levels setup yet
        if (this.props.permissionLevel == "p")
        {
            formOptions.push(<option>Joined Events</option>)
        }
        if (this.props.permissionLevel == "a")
        {
            formOptions.push(<option>My Events</option>)
            formOptions.push(<option>My Active Events</option>)
        }
        if (this.props.permissionLevel == "s")
        {
            formOptions.push(<option>Admin</option>)
            formOptions.push(<option>Participant</option>)
        }
        
        
        var searchBox;
        if(this.state.SearchType == "Date") {
            searchBox = <>
                <Form.Label>Start Date</Form.Label>  
                <Form.Control aria-label="Default" 
                                    aria-describedby="inputGroup-sizing-default"
                                    name="startDateBox"
                                    onChange={this.handleChange}
                                    />
                <Form.Label>End Date</Form.Label>  
                <Form.Control aria-label="Default" 
                                    aria-describedby="inputGroup-sizing-default"
                                    name="endDateBox"
                                    onChange={this.handleChange}
                                    />
            </>
        } else if(this.state.SearchType == "My Events" || this.state.SearchType == "Joined Events" ||
                    this.state.SearchType == "My Active Events") {
            searchBox = null
        }else {
            searchBox = <Form.Control aria-label="Default" 
                                    aria-describedby="inputGroup-sizing-default"
                                    name="eventSearchBox"
                                    onChange={this.handleChange}
                                    />
        }

        return (
            <div>
                <h1>{homeText}</h1>
                <br/>
                {createEvent}
                <p>What would you like to search by?</p>
                <Container fluid>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <Form.Control name="SearchType" as="select" defaultValue="Date" onChange={this.onChange}>
                                        {formOptions}
                                    </Form.Control>
                                </InputGroup.Prepend>
                                    {searchBox}
                            </InputGroup>
                        </Col>
                        <Col>
                            <Button onClick={this.onSearchClick}>Search</Button>
                        </Col>
                    </Row>
                </Container>
                {eventComponents}
            </div>
        );
    }
}

export default Home;
