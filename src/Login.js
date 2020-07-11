import React, { Component } from 'react';
import './Login.css'
import ApiContext from './ApiContext'


export default class Login extends Component {

    static contextType = ApiContext

    handleSubmit = e => {
        debugger
        e.preventDefault()
        const form = e.currentTarget
        const userName = form['Email-name'].value
        this.context.addUsername(userName)
            .then(name => {

                this.props.history.push(`/login/users`)
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
                        <input type="email" className="input_field" required name='Email-name' placeholder="Email" required />
                        <input type="password" className="input_field" required name='Password-name' placeholder="Password" required />
                        <button type="submit" className="signup_btn">Sign in</button>
                        <hr />

                    </form>
                </div>

            </div>

        )
    }
}