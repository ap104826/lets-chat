import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login'
import Room from './Room'
import Rooms from './Rooms'
import Register from './Register'
import './App.css'
import ApiContext from './ApiContext'



class App extends Component {
  state = {
    users: [{
      name: 'Arpita'
    }, {
      name: 'Nachiket'
    }],
    rooms: [{
      name: 'Cooking'
    }, {
      name: 'Travel'
    }],
    messages: [{
      message: 'Hi Arpita, how are you? How is the project coming along?',
      time: '10:00 Am',
      user: 'Nachiket'
    }, {
      message: 'Are we meeting today? Project has been already finished and I have results to show you.',
      time: '10:12 Am',
      user: 'Arpita'
    }, {
      time: '10:14 Am',
      user: 'Nachiket',
      message: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?'
    }, {
      time: '10:20 Am',
      user: 'Arpita',
      message: 'Actually everything was fine. I am very excited to show this to our team.'
    }]

  }

  render() {
    const value = {
      users: this.state.users,
      rooms: this.state.rooms,
      messages: this.state.messages,
    }
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <header class="App_header">
            <h1>LetsChat</h1>
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
          <Route
            path='/register'
            component={Register}
          />
        </div>
      </ApiContext.Provider>
    )

  }

}
export default App;
