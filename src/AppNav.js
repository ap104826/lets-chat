import React, { Component } from 'react';
import TokenService from './token-service'

export default class AppNav extends Component {

    handleLogout = (e) => {
        e.preventDefault()
        TokenService.clearAuthToken()
        TokenService.clearUser()
        this.props.history.push(`/login`)
    }
    render() {
        //use nav links to link to the home page
        const userName = TokenService.getUserName()
        return (<>
            <h2>User: {userName}</h2>
            <div>
                <a href='' onClick={(e) => this.handleLogout(e)}>Log out</a>
            </div>
        </>)
    }

}