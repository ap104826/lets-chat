import React, { Component } from 'react';
import './Login.css'
import ApiContext from './ApiContext'
import TokenService from './token-service'
import config from './config'
import { NavLink } from 'react-router-dom';


export default class Login extends Component {

    static contextType = ApiContext

    state = {
        incorrectCredentials: false
    }

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
                const userName = response.userName;
                TokenService.saveAuthToken(token)
                TokenService.saveUser(userName)
                this.props.history.push(`/`)
            })
            .catch(error => {
                if (error.error === 'Incorrect user_name or password') {
                    this.setState({
                        incorrectCredentials: true
                    })
                }
                console.error({ error })
            })
    }


    render() {
        return (
            <>
                <header className="App_header">
                    <h2>LetsChat</h2>
                </header>

                <div className="sign-up-form__container">
                    <h2>Login</h2>
                    <form className="sign-up-form__form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="sign-up-form__field">
                            <label className="sign-up-form__label" htmlFor="Email">Email</label>
                            <input className="sign-up-form__input" type="email" required name='Email' placeholder="Email" required />
                        </div>
                        <div className="sign-up-form__field">
                            <label className="sign-up-form__label" htmlFor="Password">Password</label>
                            <input className="sign-up-form__input" type="password" required name='Password' placeholder="Password" required />

                        </div>
                        <div className="sign-up-form__button-section">
                            <NavLink className='sign-up-form__link' to={'/register'}>Create an account</NavLink>
                            <button type="submit" className="sign-up-form__login-button">Login</button>
                        </div>


                    </form>

                    {
                        this.state.incorrectCredentials ?
                            <p className='sign-up-form__incorrect-credentials-error'>Incorrect credentials supplied. Try again with the correct credentials.</p> :
                            <></>
                    }


                </div>


            </>
        )
    }
}