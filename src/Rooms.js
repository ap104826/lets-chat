import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import rooms from './Rooms'
import ApiContext from './ApiContext'


export default class Rooms extends Component {

    static contextType = ApiContext
    handleformSubmit = e => {
        e.preventDefault()
        const form = e.currentTarget
        const roomName = form['room-name'].value
        console.log(roomName)
        this.context.addRoom(roomName)
    }

    render() {
        const { rooms = [] } = this.context

        return (

            <div>
                <form onSubmit={(e) => this.handleformSubmit(e)}>
                    <input type="text" className="input-box" required name='room-name' placeholder="Type a new Room" />

                    <button type="submit" className="signup-btn">Create</button>
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
                        </li>)}
                </ul>
            </div>
        )

    }
}
