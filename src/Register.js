import React, { Component } from 'react';


export default class Register extends Component {
    render() {
        return(
            <div>
                <div className="Register-form">

                    <h1> Sign Up</h1>
                    <form>
                        <input type="name" class="input_box" placeholder="Name" />
                        <input type="Email" class="input_box" placeholder="Email" />
                        <input type="password" class="input_box" placeholder=" Password" />
                        <button type="button" class="signup-btn">Register</button>
                        <hr />
                    </form>
                </div>
            </div>
        )
    }
}