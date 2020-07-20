import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login'
import Room from './Room'
import Rooms from './Rooms'
import './App.css'
import ApiContext from './ApiContext'
import RoomNav from './RoomNav'
import AppNav from './AppNav'
import config from './config'
import io from 'socket.io-client'
import Register from './Register'
import PrivateRoute from './PrivateRoute'
import TokenService from './token-service'


const socket = io(config.API_ENDPOINT)

class App extends Component {
  state = {
    rooms: [],
  }

  constructor(props) {
    super(props)
    this.handleAddNewRoom = this.handleAddNewRoom.bind(this)
    this.handleDeleteRoom = this.handleDeleteRoom.bind(this)
  }

  handleDeleteRoom = roomId => {
    return fetch(`${config.API_ENDPOINT}/api/rooms/${roomId}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
    })
      .then(() => {
        this.setState({
          rooms: this.state.rooms.filter(room => room.id !== roomId)
        })
      })

  }


  handleAddMessage = (message) => {
    this.setState({
      messages: [
        ...this.state.messages,
        message
      ]
    })

  }


  handleAddNewRoom = roomName => {
    return fetch(`${config.API_ENDPOINT}/api/rooms`, {
      method: 'POST',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: roomName }),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(room => {
        this.setState({
          rooms: [
            ...this.state.rooms,
            room
          ]
        })
        return room;
      })


  }

  renderNavRoutes() {
    return (
      <>
        {[]}
      </>
    )
  }

  render() {
    const value = {
      addMessage: this.handleAddMessage,
      addRoom: this.handleAddNewRoom,
      deleteRoom: this.handleDeleteRoom,
      users: this.state.users,
      messages: this.state.messages,
      socket
    }


    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <PrivateRoute
            exact
            path='/rooms/:room_id'
            component={Room}

          />
          <Route
            path='/login'
            component={Login}
          />
          <Route
            path='/register'
            component={Register}
          />
          <PrivateRoute
            exact
            path='/'
            component={Rooms}
          />

        </div>
      </ApiContext.Provider>
    )

  }

}
export default App;
