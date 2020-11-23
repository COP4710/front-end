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
        var eventList = this.props.events
        var eventComponents = (
            <div>
                {eventList.map(event => <EventComponent key={event.eventName} 
                eventName={event.eventName} eventDescription={event.eventDescription} eventLocation={event.location} 
                eventStartTime={event.start_time} eventEndTime={event.end_time} eventEmail={event.email}
                eventPhone={event.phone} eventDate={event.date} eventEndDate={event.end_date}/>)}
            </div>
        )

        return (
            <div>
                <h1>Home</h1>
                <br/>
                <Button onClick={this.handleClick}>Create Event</Button>
                <p>What would you like to search by?</p>
                <Container fluid>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <Form.Control name="SearchType" as="select" defaultValue="Date" onChange={this.onChange}>
                                        <option>Date</option>
                                        <option>Location</option>
                                    </Form.Control>
                                </InputGroup.Prepend>
                                    <FormControl aria-label="Default" 
                                    aria-describedby="inputGroup-sizing-default"
                                    />
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
