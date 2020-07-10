import React, { Component } from 'react';
import './Login.css'


export default class Login extends Component {

    render() {
        return (
            <div className="chat">
                <title>Login </title>
                <div className="sign-up-form">

                    <h1> Login</h1>
                    <form className="input-group" onSubmit={(e) => this.handleSubmit(e)}>
                        <input type="email" className="input_field" placeholder="Email" required />
                        <input type="password" className="input_field" placeholder="Password" required />
                        <button type="button" className="signup_btn">Sign up</button>
                        <hr />
                        <p>Do you have an account ? <a href="#">Sign in</a></p>
                    </form>
                </div>

            </div>

        )
    }
}