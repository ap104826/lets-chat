import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import rooms from './Rooms'
import ApiContext from './ApiContext'


export default class Rooms extends Component {

    static contextType = ApiContext
    render() {
        const { rooms = [] } = this.context

        return (
            <div>
                <a className="LeaveRoom_button" type="button" href="/Leave Room">Logout</a>
                <div>
                    <input type="text" className="input-box" placeholder="Type a new Room" />

                    <button type="button" className="signup-btn">Create</button>
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

            </div>
        )

    }
}