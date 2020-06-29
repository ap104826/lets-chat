import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            <div>
                <title>Login </title>
                <div className="sign-up-form">
                   
                    <h1> Login</h1>
                    <form>
                        <input type="email" className="input-box" placeholder="Your Email" />
                        <input type="password" className="input-box" placeholder="Password" />
                        <button type="button" className="signup-btn">Sign up</button>
                        <hr/>
                        <p class="or">OR</p>
                            <button type="button" className="facebook-btn">Login with Facebook</button>
                            <p>Do you have an account ? <a href="#">Sign in</a></p>
                    </form>
                </div>

            </div>

        )
    }
}