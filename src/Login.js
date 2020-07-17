import React, { Component } from 'react';
import './Login.css'
import ApiContext from './ApiContext'
import TokenService from './token-service'
import config from './config'


export default class Login extends Component {

    static contextType = ApiContext

    handleSubmit = e => {
        e.preventDefault()
        const form = e.currentTarget
        const userName = form['Email'].value
        const password = form['Password'].value

        return fetch(`${config.API_ENDPOINT}/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userName, password }),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then((response) => {
                //create and save the token
                const token = response.authToken;
                TokenService.saveAuthToken(token)
                this.props.history.push(`/`)
            })
            .catch(error => {
                console.error({ error })
            })
    }


    render() {
        return (
            <div className="chat">
                <title>Login </title>
                <div className="sign-up-form">

                    <h1> Login</h1>
                    <form className="input-group" onSubmit={(e) => this.handleSubmit(e)}>
                        <input type="email" className="input_field" required name='Email' placeholder="Email" required />
                        <input type="password" className="input_field" required name='Password' placeholder="Password" required />
                        <button type="submit" className="signup_btn">Sign in</button>

                        <hr />

                    </form>

                </div>

                <p>Don't have an account ? <a href="/register">Register</a></p>

            </div>

        )
    }
}