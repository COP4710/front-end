import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import '../App.css';
import { Link, Redirect } from 'react-router-dom';

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
            </div>
        );
    }
}

export default Home;
