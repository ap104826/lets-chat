import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ApiContext from './ApiContext'
import './Room.css'
import io from 'socket.io-client'
import socketIOClient from "socket.io-client";
const socket = io('http://localhost:8001')


export default class Rooms extends Component {


    static contextType = ApiContext

    handleClickDelete = (e, roomId) => {
        e.preventDefault()
        if (window.confirm("Are you sure you want to delete this room?")) {
            this.context.deleteRoom(roomId)
        }
    }
    handleOnClick = (e, roomId) => {
        e.preventDefault()
        this.props.history.push(`/rooms/${roomId}`)
        //send a join message with roomId
        const socket = socketIOClient('http://localhost:8001');
        //emit- that user has joined with an event
        //notify server that a new user wants to join the room
        socket.emit('userJoined', { roomId, userId: 20 })
    }

    handleformSubmit = e => {
        e.preventDefault()
        const form = e.currentTarget
        const roomName = form['room-name'].value
        this.context.addRoom(roomName)
            .then(room => {
                debugger

                this.props.history.push(`/rooms/${room.id}`)
            })
    }

    render() {
        const { rooms = [] } = this.context

        return (

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
        )

    }
}
