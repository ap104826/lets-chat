import React, { Component } from 'react';
import './Login.css'
import ApiContext from './ApiContext'
import TokenService from './token-service';
import config from './config'
import { NavLink } from 'react-router-dom';


export default class Register extends Component {

    static contextType = ApiContext
    state = {
        incorrectCredentials: false
    }


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

        return fetch(`${config.API_ENDPOINT}/api/users`, {
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
                const token = user.authToken;
                const userName = user.userName;
                TokenService.saveAuthToken(token);
                TokenService.saveUser(userName)
                this.props.history.push(`/`)
            })
            .catch(error => {
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
                    <h2>Register</h2>
                    <form className="sign-up-form__form" onSubmit={(e) => this.handleRegisterSubmit(e)}>
                        <div className="register-form__field">
                            <div className="sign-up-form__field">
                                <label className="sign-up-form__label" htmlFor="Email">Email</label>
                                <input className="sign-up-form__input" type="email" required name='email' placeholder="Email" required />
                            </div>


                            <div className="sign-up-form__field">
                                <label className="sign-up-form__label" htmlFor="password1">Password</label>
                                <input type="password" className="sign-up-form__input" required name='password1' placeholder="Password" required />
                            </div>

                            <div className="sign-up-form__field">
                                <label className="sign-up-form__label" htmlFor="password2">Confirm Password</label>
                                <input type="password" className="sign-up-form__input" required name='password2' placeholder="Password confirmation" required />
                            </div>

                            <div className="sign-up-form__button-section">
                                <NavLink className='o-link sign-up-form__link' to={'/login'}>Sign in</NavLink>
                                <button type="submit" className="sign-up-form__login-button">Sign up</button>
                            </div>
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
