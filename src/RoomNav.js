import React, { Component } from 'react';
import ApiContext from './ApiContext'
import { NavLink } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import { getRoomFromRoomId } from './messages-helpers'
import TokenService from './token-service';

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
        socket.emit('userLeft', { roomId, userId: TokenService.getAuthToken() })
    }
    render() {
        const room = this.props.room

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