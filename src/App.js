import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login'
import Room from './Room'
import Rooms from './Rooms'
import './App.css'
import ApiContext from './ApiContext'
import RoomNav from './RoomNav'
import config from './config'
import io from 'socket.io-client'
import Register from './Register'

const socket = io.connect(config.API_ENDPOINT)

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

    socket.on('message', (message) => {
      this.setState({
        messages: [...this.state.messages, message]
      })
    })
    fetch(`${config.API_ENDPOINT}/rooms`)
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
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleRegister = (userName, password) => {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ userName: userName, password: password }),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(user => {
        this.setState({
          users: [
            ...this.state.users,
            user
          ]
        })
        return user;
      })
      .catch(error => {
        console.error({ error })
      })

  }

  handleLogin = (userName, password) => {
    return fetch(`${config.API_ENDPOINT}/users/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ userName: userName, password: password }),
    })
    // .then(res => {
    //   if (!res.ok)
    //     return res.json().then(e => Promise.reject(e))
    //   return res.json()
    // })
    // .then(user => {
    //   this.setState({
    //     users: [
    //       ...this.state.users,
    //       user
    //     ]
    //   })
    //   return user;
    // })
    // .catch(error => {
    //   console.error({ error })
    // })

  }

  handleDeleteRoom = roomId => {
    return fetch(`${config.API_ENDPOINT}/rooms/${roomId}`, {
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
      register: this.handleRegister,
      login: this.handleLogin,
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

            <Route
              path='/rooms/:room_id'
              render={(props) => <RoomNav {...props} />}
            />


          </header>
          <Route
            exact
            path='/rooms/:room_id'
            render={(props) => <Room {...props} />}

          />
          <Route
            path='/login'
            component={Login}
          />
          <Route
            path='/register'
            component={Register}
          />
          <Route
            exact
            path='/'
            render={(props) => <Rooms {...props} />}
          />

        </div>
      </ApiContext.Provider>
    )

  }

}
export default App;
