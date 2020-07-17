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


const socket = io('http://localhost:8001')

class App extends Component {
  state = {
    rooms: [],
    messages: [{
      message: 'Hi Arpita, how are you? How is the project coming along?',
      time: new Date(),
      user: 'Nachiket',
      room_id: 1
    }, {
      message: 'Are we meeting today? Project has been already finished and I have results to show you.',
      time: new Date(),
      user: 'Arpita',
      room_id: 1
    }, {
      time: new Date(),
      user: 'Nachiket',
      message: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?',
      room_id: 2
    }, {
      time: new Date(),
      user: 'Arpita',
      message: 'Actually everything was fine. I am very excited to show this to our team.',
      room_id: 2
    }]

  }
  componentDidMount() {
    // socket.on('connect', function () {
    //   console.log('a user connected')
    // });


    fetch(`${config.API_ENDPOINT}/rooms`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(roomsRes => {
        if (!roomsRes.ok)
          return roomsRes.json().then(e => Promise.reject(e))

        return roomsRes.json()
      })
      .then((rooms) => {
        this.setState({ rooms })
      })
      .catch(error => {
        console.error({ error })
      })

  }
  constructor(props) {
    super(props)
    this.handleAddNewRoom = this.handleAddNewRoom.bind(this)
    this.handleDeleteRoom = this.handleDeleteRoom.bind(this)
  }

  handleDeleteRoom = roomId => {
    return fetch(`${config.API_ENDPOINT}/rooms/${roomId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(() => {
        this.setState({
          rooms: this.state.rooms.filter(room => room.id !== roomId)
        })
      })
      .catch(error => {
        console.error({ error })
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
    return fetch(`${config.API_ENDPOINT}/rooms`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }, {
      method: 'POST',
      headers: {
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
      .catch(error => {
        console.error({ error })
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
      rooms: this.state.rooms,
      messages: this.state.messages,
      socket
    }


    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <header className="App_header">
            <h1>LetsChat</h1>
            <PrivateRoute
              exact
              path='/'
              component={AppNav}
            />
            <PrivateRoute
              path='/rooms/:room_id'
              component={RoomNav}
            />


          </header>
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
