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
        return (<>
            <h2>LetsChat</h2>
            <a className="o-link sign-out__link" href='' onClick={(e) => this.handleLogout(e)}>Log out</a>
        </>)
    }

}