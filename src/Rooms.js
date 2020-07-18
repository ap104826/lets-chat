import React, { Component } from 'react';
import ApiContext from './ApiContext'
import './Room.css'
import io from 'socket.io-client'
import socketIOClient from "socket.io-client";
import config from './config'
import TokenService from './token-service'
import AppNav from './AppNav'
const socket = io('http://localhost:8001')

export default class Rooms extends Component {

    state = {
        rooms: [],
    }
    static contextType = ApiContext
    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/rooms`, {
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
            .catch(error => {
                console.error({ error })
            })

    }

    handleClickDelete = (e, roomId) => {
        e.preventDefault()
        if (window.confirm("Are you sure you want to delete this room?")) {
            this.context.deleteRoom(roomId)
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

                <div className="room_form">
                    <form onSubmit={(e) => this.handleformSubmit(e)}>
                        <input type="text" className="input_box" required name='room-name' placeholder="Type a new Room" />
                        <input type="submit" className="signup-btn" value="Create" />
                    </form>
                    <hr />

                    <label htmlFor="rooms">Choose a Room:</label>
                    <br></br>
                    <ul>
                        {rooms.map(room =>
                            <li key={room.id}>


                                <a href='' onClick={(e) => this.handleOnClick(e, room.id)}>{room.name}</a>

                                {/* to={`/rooms/${room.id}`} */}





                                <a href='' onClick={(e) => this.handleClickDelete(e, room.id)}>Delete</a>

                            </li>)}
                    </ul>
                </div>
            </>

        )

    }
}
