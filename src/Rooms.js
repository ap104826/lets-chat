import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import rooms from './Rooms'
import ApiContext from './ApiContext'
import './Room.css'


export default class Rooms extends Component {


    static contextType = ApiContext

    handleClickDelete = (e, roomId) => {
        e.preventDefault()
        if (window.confirm("Are you sure you want to delete this room?")) {
            this.context.deleteRoom(roomId)
        }
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
                            <NavLink
                                to={`/rooms/${room.id}`}
                            >
                                {room.name}

                            </NavLink>

                            <a href='' onClick={(e) => this.handleClickDelete(e, room.id)}>Delete</a>

                        </li>)}
                </ul>
            </div >
        )

    }
}
