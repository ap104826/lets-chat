import React, { Component } from 'react';
import ApiContext from './ApiContext'
import { NavLink } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import { getRoomFromRoomId } from './messages-helpers'

export default class RoomNav extends Component {
    static contextType = ApiContext

    handleLeaveRoom = (e, roomId) => {
        e.preventDefault()
        this.props.history.push(`/`)
        // rooms / ${ roomId }
        //send a join message with roomId
        const socket = socketIOClient('http://localhost:8001');
        //emit- that user has joined with an event
        //notify server that a new user wants to join the room
        socket.emit('userLeft', { roomId, userId: 20 })
    }
    render() {
        //getting the room id from the url
        const { room_id } = this.props.match.params
        //reading the room from the context
        const { rooms = [] } = this.context
        //getting a room given its roomId
        const room = getRoomFromRoomId(rooms, parseInt(room_id))

        if (!room) {
            return <> </>
        }
        //use nav links to link to the home page
        return (<>
            <h2>{room.name}</h2>
            <div>
                <a href='' onClick={(e) => this.handleLeaveRoom(e, room.id)}>Leave Room</a>
            </div>
        </>)
    }

}