import React, { Component } from 'react';
import ApiContext from './ApiContext'

export default class RoomNav extends Component {
    static contextType = ApiContext

    handleLeaveRoom = (e, roomId) => {
        e.preventDefault()
        this.props.history.push(`/`)
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