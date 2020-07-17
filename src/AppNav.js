import React, { Component } from 'react';
import TokenService from './token-service'

export default class AppNav extends Component {

    handleLogout = (e) => {
        e.preventDefault()
        TokenService.clearAuthToken()
        this.props.history.push(`/login`)
        //expire the jwt token
    }
    render() {
        //use nav links to link to the home page
        return (<>
            <h2>User: [INSERT USER NAME HERE]</h2>
            <div>
                <a href='' onClick={(e) => this.handleLogout(e)}>Log out</a>
            </div>
        </>)
    }

}