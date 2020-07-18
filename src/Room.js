import React, { Component } from 'react';
import ApiContext from './ApiContext'
import socketIOClient from "socket.io-client";
import config from './config'
import io from 'socket.io-client'
import TokenService from './token-service'
import RoomNav from './RoomNav';


const socket = io('http://localhost:8001')


export default class Room extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext

    state = {
        messages: [],
        users: [],
        room: null
    };

    getUniqueUsers = (users) => {
        let uniqueUsers = users.filter((user, index, self) =>
            index === self.findIndex((anotherUser) => (
                anotherUser.user_name === user.user_name
            ))
        )
        return uniqueUsers
    }

    componentWillUnmount() {
        const { room_id } = this.props.match.params
        const socket = socketIOClient('http://localhost:8001');
        socket.emit('userLeft', { roomId: room_id, authToken: TokenService.getAuthToken() })
    }

    componentDidMount() {
        const { room_id } = this.props.match.params
        socket.emit('userJoined', { roomId: room_id, authToken: TokenService.getAuthToken() })

        socket.on('message', (message) => {
            if (message.room_id !== parseInt(room_id)) {
                return
            }
            this.setState({
                messages: [...this.state.messages, message]
            })
        })

        socket.on('userJoined', (user) => {
            if (user.roomId !== room_id) {
                return
            }
            this.setState({
                users: this.getUniqueUsers([...this.state.users, user])
            })
        })

        socket.on('userLeft', ({ id, roomId }) => {
            if (roomId !== room_id) {
                return
            }
            this.setState({
                users: this.state.users.filter(u => u.id !== id)
            })
        })

        fetch(`${config.API_ENDPOINT}/rooms/${room_id}`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(room => {
                if (!room.ok)
                    return room.json().then(e => Promise.reject(e))

                return room.json()

            })
            //we get the messages and set it on the state
            .then(room => this.setState({
                room
            }))


        //read the room id from the browser url and pass it to the api url
        fetch(`${config.API_ENDPOINT}/rooms/${room_id}/messages`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(messages => {
                if (!messages.ok)
                    return messages.json().then(e => Promise.reject(e))

                return messages.json()

            })
            //we get the messages and set it on the state
            .then(messages => this.setState({
                messages: messages
            }))

        //read the room id from the browser url and pass it to the api url
        fetch(`${config.API_ENDPOINT}/rooms/${room_id}/users`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))

                return res.json()

            })
            //we get the messages and set it on the state
            .then(users => {
                this.setState({
                    users: this.getUniqueUsers(this.state.users.concat(users))
                })
            })
    }

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
            modified: new Date(),
            room_id: parseInt(room_id)
        }
        const socket = socketIOClient('http://localhost:8001');
        socket.emit('message', message) // change 'red' to this.state.color

        form['message-to-send'].value = ''
    }

    render() {

        return (
            <>
                <header className="App_header">
                    <RoomNav {...this.props} room={this.state.room} />
                </header>
                <div className="chat_container">
                    <div className="main_chat">
                        <div className="chat_nav">
                            <div className="chat_users">
                                <h2>Users</h2>
                                <ul>
                                    {this.state.users.map((user, index) => <li key={index}>{user.user_name}</li>)}
                                </ul>
                            </div>

                        </div>


                        <div className="chat_messages">
                            <div className="chat-history">
                                <ul>
                                    {this.state.messages.map((message, index) => <li key={index}>
                                        <div className="message-data align-right">
                                            <span className="message-data-time">{new Date(message.modified).getHours()}:{new Date(message.modified).getMinutes()}</span> &nbsp; &nbsp;
                <span className="message-data-name">{message.user}</span>

                                        </div>
                                        <div className="message other-message float-right">
                                            {message.message}
                                        </div>
                                    </li>)}

                                </ul>
                            </div>
                        </div>
                    </div>
                    <form className="chat_message" onSubmit={(e) => this.handleSubmit(e)}>
                        <input name="message-to-send" className="message_input" id="message-to-send" placeholder="Type your message" />
                        <button className="message_send">Send</button>
                    </form>

                </div>
            </>
        )

    }
}
