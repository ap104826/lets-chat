import React, { Component } from 'react';
import ApiContext from './ApiContext'
import { getMessagesForRoom } from './messages-helpers'
import { NavLink } from 'react-router-dom';


export default class Room extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext

    roomSelected(e) {
        const roomId = e.target.value
        if (roomId = 'all') {
            this.props.history.push('/')
            return
        }
        this.props.history.push(`/room/${roomId}`)
    }

    handleSubmit = e => {
        e.preventDefault()
        const { room_id } = this.props.match.params
        const form = e.currentTarget
        const messageName = form['message-to-send'].value
        const message = {
            message: messageName,
            user: 'Nachiket',
            time: '10:00am',
            room_id: parseInt(room_id)
        }

        this.context.addMessage(message)

    }

    render() {

        const { room_id } = this.props.match.params
        const { users = [], rooms = [], messages = [] } = this.context
        const messagesForRoom = getMessagesForRoom(messages, parseInt(room_id))

        return (
            <div className="chat_container">
                <div class="main_chat">
                    <div className="chat_nav">
                        <div className="chat_users">
                            <h2>Users</h2>
                            <ul>
                                {users.map(user => <li>{user.name}</li>)}
                            </ul>
                        </div>

                        <div className="chat_rooms">
                            <h2>Rooms</h2>
                            <ul>
                                {rooms.map(room =>
                                    <li key={room.id}>
                                        <NavLink
                                            to={`${room.id}`}
                                        >
                                            {room.name}

                                        </NavLink>
                                    </li>)}
                            </ul>
                        </div>
                    </div>

                    <div class="chat_messages">
                        <div class="chat-history">
                            <ul>
                                {messagesForRoom.map(message => <li>
                                    <div class="message-data align-right">
                                        <span class="message-data-time">{message.time}</span> &nbsp; &nbsp;
              <span class="message-data-name">{message.user}</span>
                                    </div>
                                    <div class="message other-message float-right">
                                        {message.message}
                                    </div>
                                </li>)}

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="chat_message">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input name="message-to-send" className="message_input" id="message-to-send" placeholder="Type your message" />
                        <button>Send</button>
                    </form>
                </div>

            </div>
        )

    }
}
