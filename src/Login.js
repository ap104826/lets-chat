import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            <div>
                <title>Login </title>
                <div className="sign-up-form">

                    <h1> Login</h1>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input type="email" className="input_email" placeholder="Email" />
                        <input type="password" className="input_password" placeholder="Password" />
                        <button type="button" className="signup_btn">Sign up</button>
                        <hr />
                        <p>Do you have an account ? <a href="#">Sign in</a></p>
                    </form>
                </div>

            </div>

        )
    }
}