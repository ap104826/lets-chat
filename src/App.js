import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login'
import Room from './Room'
import Rooms from './Rooms'
import './App.css'
import ApiContext from './ApiContext'
import RoomNav from './RoomNav'



class App extends Component {
  state = {
    users: [{
      name: 'Arpita'
    }, {
      name: 'Nachiket'
    }],
    rooms: [{
      name: 'Cooking',
      id: 1
    }, {
      name: 'Travel',
      id: 2
    }],
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
  constructor(props) {
    super(props)
    this.handleAddNewRoom = this.handleAddNewRoom.bind(this)
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
    console.log(roomName)
    this.setState({
      rooms: [
        ...this.state.rooms,
        { name: roomName, id: this.state.rooms.length + 1 }
      ]
    })
  }


  render() {
    const value = {
      addMessage: this.handleAddMessage,
      addRoom: this.handleAddNewRoom,
      users: this.state.users,
      rooms: this.state.rooms,
      messages: this.state.messages,
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
