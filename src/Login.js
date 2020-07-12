import React, { Component } from 'react';
import './Login.css'
import ApiContext from './ApiContext'


export default class Login extends Component {

    static contextType = ApiContext

    handleSubmit = e => {
        debugger
        e.preventDefault()
        const form = e.currentTarget
        const userName = form['Email'].value
        const password = form['Password'].value
        this.context.login(userName, password)
            .then(userName => {

                this.props.history.push(`/`)
            })
    }


    render() {
        const { userNames = [], passwords = [] } = this.context

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

            </div>

        )
    }
}