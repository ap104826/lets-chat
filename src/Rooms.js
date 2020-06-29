import React, { Component } from 'react';

export default class Room extends Component {
    render() {
        return (
            <div>
                <a class="LeaveRoom_button" type="button" href="/Leave Room">Logout</a>
                <div>
                    <input type="text" className="input-box" placeholder="Type a new Room" />
                   
                    <button type="button" className="signup-btn">Create</button>
                  <hr/>
                    <form>
                        <label for="rooms">Choose a Room:</label>
                        <br></br>
                        <select name="rooms" id="room">
                            <option value="travel">Travel</option>
                            <option value="cooking">Cooking</option>
                            <option value="Homes">Homes</option>
                            <option value="Gardening">Gardening</option>
                        </select>
                            <input type="submit" value="Submit"/>
                        </form>

                </div>

            </div>
        )
        
        }
        }