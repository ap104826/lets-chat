import React, { Component } from 'react';
import './Login.css'
import ApiContext from './ApiContext'
import TokenService from './token-service';
import config from './config'


export default class Register extends Component {

    static contextType = ApiContext


    handleRegisterSubmit = e => {

        e.preventDefault()
        const form = e.currentTarget
        const password1 = form.password1.value
        const password2 = form.password2.value

        if (password1 !== password2) {
            alert("Password doesn't match");
            return;
        }

        const userName = form['email'].value
        const password = form['password1'].value

        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userName: userName, password: password }),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(user => {
                const token = TokenService.makeBasicAuthToken(user.userName, user.password)
                TokenService.saveAuthToken(token);
                this.props.history.push(`/`)
            })
            .catch(error => {
                console.error({ error })
            })
    }



    render() {
        return (
            <div className="chat">
                <title>Register </title>
                <div className="sign-up-form">

                    <h1> Register</h1>
                    <form className="input-group" onSubmit={(e) => this.handleRegisterSubmit(e)}>
                        <input type="email" className="input_field" required name='email' placeholder="Email" required />
                        <input type="password" className="password1" required name='password1' placeholder="Password" required />
                        <input type="password" classname="password2" required name='password2' placeholder="Password confirmation" required />
                        <button type="submit" className="signup_btn">Sign up</button>
                        <hr />
                        <p>Do you have an account ? <a href="/login">Sign in</a></p>

                    </form>

                </div>
            </div>
        )
    }
}