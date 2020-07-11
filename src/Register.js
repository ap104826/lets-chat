import React, { Component } from 'react';
import './Login.css'
import ApiContext from './ApiContext'


export default class Register extends Component {

    static contextType = ApiContext


    handleRegisterSubmit = e => {

        e.preventDefault()
        const form = e.currentTarget
        const userName = form['register'].value
        const password = form['password'].value
        this.context.register(userName, password)
            .then(userName => {

                this.props.history.push(`/`)
            })
    }



    render() {
        return (
            <div className="chat">
                <title>Register </title>
                <div className="sign-up-form">

                    <h1> Register</h1>
                    <form className="input-group" onSubmit={(e) => this.handleRegisterSubmit(e)}>
                        <input type="email" className="input_field" required name='register' placeholder="Email" required />
                        <input type="password" className="input_field" required name='password' placeholder="Password" required />
                        <input type="password" classname="password confirmation" placeholder="Password confirmation" required />
                        <button type="submit" className="signup_btn">Sign up</button>
                        <hr />
                        <p>Do you have an account ? <a href="#">Sign in</a></p>
                    </form>
                </div>

            </div>

        )
    }
}