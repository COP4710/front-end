import '../App.css';
import {Link, Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

export class CreateEvent extends React.Component{
    constructor(props){
    super(props)

    this.state = {
        redirect: false
    }

    this.handleOnClickSubmit = this.handleOnClickSubmit.bind(this)
  }

  handleChange = event => {
    this.setState({name: event.target.value})
  }

  

  handleOnClickSubmit () {
    axios.post()

    this.setState({redirect: true})

  }

  render() {
    if(this.state.redirect)
        return <Redirect to='/'/>

    return (
      <div className="create-appoint-section border border-dark">
        <h1>Request an Event</h1>
        <br/>
        <Form>
            <Form.Group as={Row}>
                <Form.Label inline column >Event Name:</Form.Label>
                <Col sm={10}>
                  <Form.Control inline type="text"></Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label inline column >Description:</Form.Label>
                <Col sm={10}>
                  <Form.Control inline type="text"></Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} >
                <Form.Group as={Col}>
                  <Form.Label >Location:</Form.Label>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control type="text"></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Category:</Form.Label>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control type="text"></Form.Control>
                </Form.Group>
            </Form.Group>
            <Form.Group as={Row} >
                <Form.Group as={Col}>
                  <Form.Label >Email:</Form.Label>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control type="text"></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Phone Number:</Form.Label>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control type="text"></Form.Control>
                </Form.Group>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Group as={Col}>
                  <Form.Label >Start time:</Form.Label>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control type="text"></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>End time:</Form.Label>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control type="text"></Form.Control>
                </Form.Group>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Group as={Col}>
                  <Form.Label >Date:</Form.Label>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control type="text"></Form.Control>
                </Form.Group>
            </Form.Group>
            <Form.Group as={Row}>
              <Col>
                <Button onClick={this.handleOnClickSubmit}>Submit Event</Button>
              </Col>
            </Form.Group>
        </Form>
      </div>
    );
  }
}

export default CreateEvent