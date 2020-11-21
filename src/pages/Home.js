import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import '../App.css';
import { Link, Redirect } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap'

export class Home extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            redirect: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(
            {redirect: true}
        )
    }

    render() {
        if(this.state.redirect)
        {
            return <Redirect to='/createevent'/>
        }


        return (
            <div>
                <h1>Home</h1>
                <Button onClick={this.handleClick}>Create Event</Button>

                <p>What would you like to search by?</p>
                <Container fluid>
                    <Row>
                        <Col>
                            <DropdownButton as={ButtonGroup} title="Search Options" id="bg-vertical-dropdown-1">
                                <Dropdown.Item eventKey="1">Location</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Time</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                />
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
