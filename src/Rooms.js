import React, { Component } from 'react';
import ApiContext from './ApiContext'
import './Room.css'
import io from 'socket.io-client'
import socketIOClient from "socket.io-client";
import config from './config'
import TokenService from './token-service'
import AppNav from './AppNav'

export default class Rooms extends Component {

    state = {
        rooms: [],
    }
    static contextType = ApiContext
    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/api/rooms`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(roomsRes => {
                if (!roomsRes.ok)
                    return roomsRes.json().then(e => Promise.reject(e))

                return roomsRes.json()
            })
            .then((rooms) => {
                this.setState({ rooms })
            })


    }

    handleClickDelete = (e, roomId) => {
        e.preventDefault()
        if (window.confirm("Are you sure you want to delete this room?")) {
            return fetch(`${config.API_ENDPOINT}/api/rooms/${roomId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${TokenService.getAuthToken()}`,
                    'content-type': 'application/json'
                },
            })
                .then(() => {
                    this.setState({
                        rooms: this.state.rooms.filter(room => room.id !== roomId)
                    })
                })

        }
    }
    handleOnClick = (e, roomId) => {
        e.preventDefault()
        this.props.history.push(`/rooms/${roomId}`)
    }

    handleformSubmit = e => {
        e.preventDefault()
        const form = e.currentTarget
        const roomName = form['room-name'].value
        this.context.addRoom(roomName)
            .then(room => {
                this.props.history.push(`/rooms/${room.id}`)
            })
    }

    render() {
        const { rooms = [] } = this.state

        return (
            <>
                <header className="App_header">
                    <AppNav history={this.props.history} />
                </header>

                <div className="sign-up-form__container">
                    <h2>Create a room</h2>
                    <form className="sign-up-form__form" onSubmit={(e) => this.handleformSubmit(e)}>

                        <div className="sign-up-form__field">
                            <label className="sign-up-form__label" htmlFor="room-name">Room name</label>
                            <input type="text" className="sign-up-form__input" required name='room-name' placeholder="Type a new Room" />
                        </div>

                        <div className="sign-up-form__button-section">
                            <button type="submit" className="sign-up-form__login-button">Create</button>
                        </div>

                    </form>

                    <div className="rooms__list-container">
                        <h2>Choose a room</h2>

                        <ul>
                            {rooms.map(room =>
                                <li key={room.id} className="rooms__list-item">
                                    <a href='' className="o-link room__link" onClick={(e) => this.handleOnClick(e, room.id)}>{room.name}</a>
                                    <a href='' className="o-link room__link" onClick={(e) => this.handleClickDelete(e, room.id)}>Delete</a>
                                </li>)}
                        </ul>
                    </div>


                </div>
            </>

        )

    }
}
