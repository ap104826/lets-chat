import React, { Component } from 'react';
import ApiContext from './ApiContext'

export default class Room extends Component {
    static contextType = ApiContext
    render() {
        const { users = [], rooms = [], messages = [] } = this.context

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
                                {rooms.map(room => <li>{room.name}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div class="chat_messages">
                        <div class="chat-history">
                            <ul>
                                {messages.map(message => <li>
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
                    <input name="message-to-send" className="message_input" id="message-to-send" placeholder="Type your message" />
                    <button>Send</button>
                </div>
            </div>
        )

    }
}
