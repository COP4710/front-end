import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import '../App.css';
import { Link, Redirect } from 'react-router-dom';
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
        
        var searchBar;
        if(this.state.SearchType == "Date") {
            searchBar = <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        />
        } else if(this.state.SearchType == "Location"){
            // Implement: Add Get Locations from API Here
            searchBar = <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        as="select"
                        >
                            <option>Amway</option>
                            <option>Test</option>
                        </FormControl>
        }

        return (
            <div>
                <h1>Home</h1>
                <Button onClick={this.handleClick}>Create Event</Button>

                <p>What would you like to search by?</p>
                <Container fluid>
                    <Row>
                        <Col>
                            <Form.Control name="SearchType" as="select" defaultValue="Date" onChange={this.onChange}>
                                <option>Date</option>
                                <option>Location</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">
                                        {this.state.SearchType}
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                {searchBar}
                            </InputGroup>
                        </Col>
                        <Col>
                            <Button>Search</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;
