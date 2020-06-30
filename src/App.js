import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login'
import Room from './Room'
import Rooms from './Rooms'
import Register from './Register'
import './App.css'


class App extends Component {
  render() {
    return (
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
    )

  }

}
export default App;
