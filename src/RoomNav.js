import React, { Component } from 'react';
import ApiContext from './ApiContext'
import Room from './Room';
import Rooms from './Rooms';
import { NavLink } from 'react-router-dom';

import { getRoomFromRoomId } from './messages-helpers'

export default class RoomNav extends Component {
    static contextType = ApiContext
    render() {
        //getting the room id from the url
        const { room_id } = this.props.match.params
        //reading the room from the context
        const { rooms = [] } = this.context
        //getting a room given its roomId
        const room = getRoomFromRoomId(rooms, parseInt(room_id))
        //use nav links to link to the home page
        return (<>
            <h2>{room.name}</h2>
            <div>
                <NavLink to="/">Leave Room</NavLink>
                <NavLink to="/">Create Room</NavLink>
            </div>
        </>)
    }

}