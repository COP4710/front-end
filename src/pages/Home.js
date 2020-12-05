import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import EventComponent from '../components/EventComponent'
import '../App.css';
import { Redirect } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap'

export class Home extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            redirect: false,
            SearchType: "Date"
        }

        this.handleClick = this.handleClick.bind(this)
        this.onChange = this.onChange.bind(this)
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
        var eventList = this.props.events
        var eventComponents = (
            <div>
                {eventList.map(event => <EventComponent key={event.title} title={event.title} 
                url={event.url} description={event.description} address={event.address} 
                city={event.city} start_date={event.start_date} end_date={event.end_date} 
                permissionLevel={this.props.permissionLevel} current_user={this.props.username} host_username={event.eventOwner}/>)}
            </div>
        )
        
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
                <FormControl aria-label="Default" 
                                    aria-describedby="inputGroup-sizing-default"
                                    />
                <Form.Label>End Date</Form.Label>  
                <FormControl aria-label="Default" 
                                    aria-describedby="inputGroup-sizing-default"
                                    />
            </>
        } else if(this.state.SearchType == "City"){
            searchBox = <FormControl aria-label="Default" 
                                    aria-describedby="inputGroup-sizing-default"
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
                            <Button>Search</Button>
                        </Col>
                    </Row>
                </Container>
                {eventComponents}
            </div>
        );
    }
}

export default Home;
